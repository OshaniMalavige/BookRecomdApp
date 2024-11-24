const express = require('express');
const auth = require('../middleware/auth');
const Book = require('../models/Book');

const router = express.Router();

router.get('/my_books', auth, async (req, res) => {
    try {
        const loggedUserId = req.user.id; // User ID from token
        const myBooks = await Book.find({ userId: loggedUserId }); // Assuming books have a 'userId' field
        res.json(myBooks);
    } catch (err) {
        console.error("Error fetching user's books: ", err);
        res.status(500).json({ error: err.message });
    }
});

// Route to get books of other users
router.get('/other_users_books', auth, async (req, res) => {
    try {
        const loggedUserId = req.user.id; // User ID from token
        const otherUsersBooks = await Book.find({ userId: { $ne: loggedUserId } });
        res.json(otherUsersBooks);
    } catch (err) {
        console.error("Error fetching other users' books: ", err);
        res.status(500).json({ error: err.message });
    }
});

// add a new book
router.post('/add', auth, async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const userId = req.user.id; // Assuming `auth` middleware sets `req.user`

        const book = new Book({ title, author, description, userId });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: err.message });
    }
});

// single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        res.json(book);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: err.message });
    }
});

// update a book by ID
router.put('/update/:id', auth, async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, description },
            { new: true }
        );
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        res.json(book);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE a book by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        res.json({ msg: 'Book deleted' });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
