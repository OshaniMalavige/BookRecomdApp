import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

const AddBookForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Function to handle form submission and API integration
    const onSubmit = async (data) => {
        try {
            // Sending the request to the backend
            const response = await axios.post("http://localhost:5000/api/books/add", data, {
                headers: {
                    "x-access-token": localStorage.getItem("token"), // Use the token stored in localStorage
                },
            });
            console.log("Book added successfully:", response.data);
            reset(); // Reset the form fields after success
        } catch (error) {
            console.error("Error adding book:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
            <TextField
                label="Title"
                name="title"
                type="text"
                register={register}
                errors={errors}
                className="mb-4"
            />
            <TextField
                label="Author"
                name="author"
                type="text"
                register={register}
                errors={errors}
                className="mb-4"
            />
            <TextField
                label="Description"
                name="description"
                type="text"
                register={register}
                errors={errors}
                className="mb-4"
            />
            <Button type="submit" className="w-full">
                Add Book
            </Button>
        </form>
    );
};

export default AddBookForm;
