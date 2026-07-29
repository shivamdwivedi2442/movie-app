'use client';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react';


export default function Signup() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
  const [showPassword, setShowPassword] = useState(false);



  const onsubmit = async (data) => {
    try {
      let r = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      let res = await r.json();

      if (res.success) {
        alert("Account created successfully! Please Log In.");
        window.location.href = "/login";
      } else {
        if (res.message.toLowerCase().includes("exist")) {
          setError("email", { type: "server", message: res.message });
        } else {
          setError("root", { type: "server", message: res.message });
        }
      }

    } catch (error) {
      setError("root", { type: "server", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 font-sans">
      <div className="w-full max-w-md bg-zinc-900/90 p-8 rounded-xl border border-zinc-800 shadow-2xl backdrop-blur-md">
        <h1 className="flex flex-col items-center text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
        <p className="flex flex-col items-center text-zinc-400 text-sm mb-6">Sign up to get started</p>

        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Full Name</label>
            <input type="text" placeholder="John Doe" {...register("name", { required: "Enter Name" })} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm" />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name.message}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email Address</label>
            <input type="email" placeholder="name@example.com" {...register("email", { required: "Enter Email" })} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm" />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Password</label>
            <div className="relative w-full">
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" {...register("password", { required: "Enter Password" })} className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-sm" />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer flex items-center text-zinc-400 hover:text-white select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>
            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password.message}</div>}
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-2 text-sm shadow-lg shadow-red-600/20 active:scale-[0.98] disabled:bg-zinc-700">
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-zinc-400 text-xs mt-4">Already have an account? <Link href="/login" className="text-red-500 hover:underline">Log In</Link></p>
      </div>
    </div>
  );
}
