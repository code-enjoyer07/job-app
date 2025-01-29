import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { z, ZodError } from "zod";
import { useNavigate } from "react-router-dom";
import { ENV } from "../env";

const loginSchema = z.object({
    username: z.string().min(3, "Username harus memiliki minimal 3 karakter"),
    password: z.string().min(5, "Password harus memiliki minimal 5 karakter"),
});

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    const navigate = useNavigate()

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            loginSchema.parse({ username, password });

            const response = await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_URL}/auth/login`,
                data: {
                    username,
                    password,
                },
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                const username = await axios({
                    method: "GET",
                    url: `${import.meta.env.VITE_API_URL}/auth/users`,
                    headers: {
                        Authorization: `Bearer ${response.data.token}`
                    }
                })
                localStorage.setItem('username', username.data.username)
                if (username.status == 200) {
                    if (username.data.role == "admin") {
                        window.location.href = '/dashboard'
                    } else {
                        window.location.href = '/dashboard/user'
                    }
                }
            }
        } catch (error) {
            if (error instanceof ZodError) {
                const newErrors: { username?: string; password?: string } = {};
                error.errors.forEach((err) => {
                    if (err.path[0] === "username") {
                        newErrors.username = err.message;
                    } else if (err.path[0] === "password") {
                        newErrors.password = err.message;
                    }
                });
                setErrors(newErrors);
            } else if (axios.isAxiosError(error)) {
                console.error("Login gagal:", error.response?.data);
            } else {
                console.error("Terjadi kesalahan:", error);
            }
        }
    };

    useEffect(() => {
        const loading = async () => {
            if (localStorage.getItem('token')) {
                const username = await axios({
                    method: "GET",
                    url: `${import.meta.env.VITE_API_URL}/auth/users`,
                    headers: {
                        Authorization: `Bearer ${ENV.TOKEN}`
                    }
                })
                if (username.data.role == 'admin') {
                    navigate('/dashboard')
                } else {
                    navigate('/dashboard/user')
                }
            }
        }
        loading()
    }, [])

    return (
        <>
            <Navbar />
            <main>
                <header className="jumbotron">
                    <div className="container text-center">
                        <h1 className="display-4">Job Seekers Platform</h1>
                    </div>
                </header>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form className="card card-default" onSubmit={submitHandler}>
                                <div className="card-header">
                                    <h4 className="mb-0">Login</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Username</div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                            {errors.username && <div className="text-danger">{errors.username}</div>}
                                        </div>
                                    </div>

                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Password</div>
                                        <div className="col-8">
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            {errors.password && <div className="text-danger">{errors.password}</div>}
                                        </div>
                                    </div>

                                    <div className="form-group row align-items-center mt-4">
                                        <div className="col-4"></div>
                                        <div className="col-8">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
