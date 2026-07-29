import { NextResponse } from "next/server";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request) {
    try {
        let data = await request.json();

        await mongoose.connect(process.env.MONGODB_URI);

        const user = await User.findOne({ email: data.email , name:data.name});

        if (user) {
            return NextResponse.json(
                { success: false, message: "User Already exists" }
            );
        }

        let newUser = await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        })

        return NextResponse.json({
            success: true,
            message: "Account created successfully!",
            data: newUser
        }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server Error", error: error.message },
        );
    }
}