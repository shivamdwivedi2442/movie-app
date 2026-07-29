import mongoose from "mongoose";
import { NextResponse } from "next/server";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request) {
    try {
        const data = await request.json()

        await mongoose.connect(process.env.MONGODB_URI);

        const user = await User.findOne({ email: data.email });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Account not found. Please sign up first." }
            );
        }

        if (user.password !== data.password) {
            return NextResponse.json(
                { success: false, message: "Incorrect password. Please try again." }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Login successful!",
            user: {
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error occurred", error: error.message }
        );
    }
}