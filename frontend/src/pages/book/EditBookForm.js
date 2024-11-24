import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

const EditBookForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const navigate = useNavigate();
    const { id } = useParams();

    React.useEffect(() => {
        // Fetch the book details to pre-fill the form
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${id}`, {
                    headers: {
                        "x-access-token": localStorage.getItem("token"), // Token for authentication
                    },
                });
                const { title, author, description } = response.data;
                setValue("title", title);
                setValue("author", author);
                setValue("description", description);
            } catch (err) {
                console.error("Error fetching book details:", err.response?.data || err.message);
                alert("Failed to load book details.");
            }
        };

        fetchBook();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/books/update/${id}`,
                data,
                {
                    headers: {
                        "x-access-token": localStorage.getItem("token"), // Token for authentication
                    },
                }
            );
            alert(response.data.msg);
            navigate("/books/personalLibrary"); // Redirect to personal library after updating
        } catch (err) {
            console.error("Error updating book:", err.response?.data || err.message);
            alert("Failed to update book.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
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
                Update Book
            </Button>
        </form>
    );
};

export default EditBookForm;
