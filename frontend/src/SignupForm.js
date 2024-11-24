import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from './components/Button';
import TextField from './components/TextField';

const SignupForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', data);
            alert(response.data.msg);
        } catch (err) {
            alert('Error: ' + err.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
    <div className="font-[sans-serif]">
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
                <div>
                    <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-purple-950">
                        Seamless Login for Exclusive Access
                    </h2>
                    <p className="text-md mt-6 text-gray-800">
                        Explore the world’s newest technologies designed for developers
                        and designers around the world. Millions of developers and designers
                        around the world use templates on OMThemeStore - the home to the world&#39;s
                        best designs and creative professionals.
                    </p>
                    <div className="flex items-center space-x-4 mt-6">
                        <div className="flex space-x-2">
                            <img
                                src="https://ui-avatars.com/api/?name=User+1&background=random"
                                alt="User 1"
                                className="w-12 h-12 rounded-full"
                            />
                            <img
                                src="https://ui-avatars.com/api/?name=User+2&background=random"
                                alt="User 2"
                                className="w-12 h-12 rounded-full"
                            />
                            <img
                                src="https://ui-avatars.com/api/?name=User+3&background=random"
                                alt="User 3"
                                className="w-12 h-12 rounded-full"
                            />
                            <img
                                src="https://ui-avatars.com/api/?name=User+4&background=random"
                                alt="User 4"
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                        <p className="text-md">Over 15.7k Happy Customers</p>
                    </div>
                    <p className="text-sm mt-12 text-gray-800">
                        Don&#39;t have an account
                        <a
                            href="/"
                            className="text-blue-600 font-semibold hover:cursor-pointer ml-1"
                        >
                            Login here
                        </a>
                    </p>
                </div>

                <form className="max-w-md md:ml-auto w-full" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-purple-950 text-3xl font-extrabold mb-8">Sign Up</h3>

                    <div className="space-y-4">
                        <TextField
                            label="Name" name="name" type="text" register={register} errors={errors}
                        />
                        <TextField
                            label="Email" name="email" type="email" register={register} errors={errors}
                        />
                        <TextField label="Password" name="password" type="password" register={register} errors={errors}/>
                    </div>

                    <div className="!mt-8 w-full">
                        <div className="flex justify-end">
                            <Button type="submit" className="mt-4" isLoading={isLoading}>
                                SignUp
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default SignupForm;
