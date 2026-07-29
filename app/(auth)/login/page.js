'use client'
import { useForm } from "react-hook-form"
import React, { useState } from 'react';
import Link from "next/link"
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from "@/lib/AuthContext";

export default function Login() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm();
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth();

    const onsubmit = async (data) => {
        try {
            let r = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            let res = await r.json();

            if (res.success) {
                // Save the logged-in user into AuthContext (localStorage) so the
                // navbar switches to the profile menu and stays logged in on reload.
                login({ name: res.user.name, email: res.user.email });
                window.location.href = "/";
            } else {

                if (res.message.toLowerCase().includes("password")) {
                    setError("password", { type: "server", message: res.message });
                }

                else if (res.message.toLowerCase().includes("account") || res.message.toLowerCase().includes("user")) {
                    setError("email", { type: "server", message: res.message });
                }
                else {
                    setError("email", { type: "server", message: res.message });
                }
            }

        } catch (error) {
            setError("root", { type: "server", message: "Something went wrong. Please try again." });
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 font-sans">
            <div className="w-full max-w-md bg-zinc-900/90 p-8 rounded-xl border border-zinc-800 shadow-2xl backdrop-blur-md">
                <h1 className="flex flex-col items-center text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
                <p className="flex flex-col items-center text-zinc-400 text-sm mb-6">Enter your details to sign in</p>
                {errors.root && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg text-center">{errors.root.message}</div>}

                <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            {...register("email", { required: "Enter Email" })}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm"
                        />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("password", { required: "Enter Password" })}
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm"
                            />
                            <span
                                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer flex items-center text-zinc-400 hover:text-white select-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                        </div>
                        {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-2 text-sm shadow-lg shadow-red-600/20 active:scale-[0.98] disabled:bg-zinc-700"
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-zinc-400 text-xs mt-4">
                    Don't have an account? <Link href="/signup" className="text-red-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}