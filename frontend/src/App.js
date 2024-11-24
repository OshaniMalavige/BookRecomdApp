import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from "./LoginForm";
import RegisterForm from "./SignupForm";
import Library from "./Library";
import Header from './components/theme/Header';
import AddBookPage from "./pages/book/AddBookForm";
import {Toaster} from "react-hot-toast";
import PersonalLibrary from "./pages/book/PersonalLibrary";
import EditBookForm from "./pages/book/EditBookForm";

const App = () => {
    return (
        <Router>
            <Header />
            <Toaster />
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/library" element={<Library />} />
                <Route path="/books/add" element={<AddBookPage />} />
                <Route path="/books/personalLibrary" element={<PersonalLibrary />} />
                <Route path="/books/edit/:id" element={<EditBookForm />} />
            </Routes>
        </Router>
    );
};

export default App;
