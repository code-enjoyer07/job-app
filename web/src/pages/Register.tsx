import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const registerSchema = z
    .object({
        username: z.string().min(3, "Username harus minimal 3 karakter"),
        email: z.string().email("Email tidak valid"),
        password: z.string().min(6, "Password harus minimal 6 karakter"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password dan Confirm Password tidak cocok",
        path: ["confirmPassword"],
    });

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const validatedData = registerSchema.parse({
                username,
                email,
                password,
                confirmPassword,
            });

            const response = await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_URL}/auth/register`,
                data: {
                    username: validatedData.username,
                    email: validatedData.email,
                    password: validatedData.password,
                    password_confirmation: validatedData.confirmPassword,
                },
            });

            if (response.status === 201) {
                setMessage("Registrasi berhasil! Anda akan dialihkan ke halaman login dalam 5 detik...");
                setErrors({});

                setTimeout(() => {
                    setMessage("");
                    navigate("/login");
                }, 5000);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        fieldErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(fieldErrors);
            } else if (axios.isAxiosError(error)) {
                console.error("Registrasi gagal:", error.response?.data);
                const serverErrors = error.response?.data.errors;
                if (serverErrors) {
                    setErrors(serverErrors);
                } else {
                    setErrors({ submit: error.response?.data.message || "Terjadi kesalahan saat registrasi." });
                }
            } else {
                console.error("Terjadi kesalahan:", error);
                setErrors({ submit: "Terjadi kesalahan saat registrasi." });
            }
        }
    };

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
                                    <h4 className="mb-0">Register</h4>
                                </div>
                                <div className="card-body">
                                    {errors.submit && (
                                        <div className="alert alert-danger" role="alert">
                                            {errors.submit}
                                        </div>
                                    )}

                                    {message && (
                                        <div className="alert alert-success" role="alert">
                                            {message}
                                        </div>
                                    )}

                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Username</div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                            {errors.username && (
                                                <div className="invalid-feedback">{errors.username}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Email</div>
                                        <div className="col-8">
                                            <input
                                                type="email"
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">{errors.email}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Password</div>
                                        <div className="col-8">
                                            <input
                                                type="password"
                                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            {errors.password && (
                                                <div className="invalid-feedback">{errors.password}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row align-items-center">
                                        <div className="col-4 text-right">Confirm Password</div>
                                        <div className="col-8">
                                            <input
                                                type="password"
                                                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            {errors.confirmPassword && (
                                                <div className="invalid-feedback">{errors.confirmPassword}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group row align-items-center mt-4">
                                        <div className="col-4"></div>
                                        <div className="col-8">
                                            <button type="submit" className="btn btn-primary">
                                                Register
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
