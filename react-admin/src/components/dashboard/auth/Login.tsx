// import React, { useState, ChangeEvent, FormEvent } from "react";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
interface FormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const schema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        rememberMe: Yup.boolean(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<FormData> = data => {
        // Proceed with form submission
        console.log('Form submitted successfully:', data);
    };
    return (
        <main className="d-flex w-100" style={{ width: "100%" }}>
            <div className="container d-flex flex-column">
                <div className="row vh-100">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <div className="text-center mt-4">
                                <h1 className="h2">Welcome back!</h1>
                                <p className="lead">Sign in to your account to continue</p>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-3">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    {...register("email")}
                                                />
                                                {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Password</label>
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    {...register("password")}
                                                />
                                                {errors.password && <div className="text-danger">{errors.password.message}</div>}
                                            </div>
                                            <div>
                                                <div className="form-check align-items-center">
                                                    <input
                                                        id="customControlInline"
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        // {...register("rememberMe")}
                                                    />
                                                    <label
                                                        className="form-check-label text-small"
                                                        htmlFor="customControlInline"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-grid gap-2 mt-3">
                                                <button type="submit" className="btn btn-lg btn-primary">
                                                    Sign in
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-3">
                                Don't have an account? <a href="pages-sign-up.html">Sign up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login