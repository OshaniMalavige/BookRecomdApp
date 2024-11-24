import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const PersonalLibrary = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/books/my_books", {
                    headers: {
                        "x-access-token": localStorage.getItem("token"), // Token for authentication
                    },
                });
                setBooks(response.data);
            } catch (err) {
                console.error("Error fetching personal library:", err.response?.data || err.message);
                setError(err.response?.data?.error || "Failed to fetch books");
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"), // Token for authentication
                },
            });
            setBooks(books.filter((book) => book._id !== id));
        } catch (err) {
            console.error("Error deleting book:", err.response?.data || err.message);
            alert("Failed to delete book. Please try again.");
        }
    };

    const handleEdit = (id) => {
        navigate(`/books/edit/${id}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">My Personal Library</h1>
            {books.length === 0 ? (
                <p className="text-gray-500 text-center">You haven't added any books yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 relative"
                        >
                            <h2 className="text-xl font-semibold">{book.title}</h2>
                            <p className="text-gray-700">Author: {book.author}</p>
                            <p className="text-gray-500 mt-2">{book.description}</p>
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <FiEdit
                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                    onClick={() => handleEdit(book._id)}
                                />
                                <FiTrash2
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => handleDelete(book._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonalLibrary;
