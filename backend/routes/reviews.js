const express = require('express');
const auth = require('../middleware/auth');
const Review = require('../models/Review');

const router = express.Router();

router.get('/', async (req, res) => {
    const reviews = await Review.find().populate('book user', 'title name');
    res.json(reviews);
});

router.post('/', auth, async (req, res) => {
    const { book, text } = req.body;
    const review = new Review({ book, text, user: req.user.id });
    await review.save();
    res.status(201).json(review);
});

module.exports = router;
