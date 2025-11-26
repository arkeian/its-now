import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/passwordHashing";
import { signToken } from "../configs/jwt";
import { isNonEmptyString, isValidEmail, isStrongPassword } from "../utils/validators";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!isNonEmptyString(username, 32)) {
            return res.status(400).json({ msg: "Username is required and must be at most 32 characters" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({ msg: "Password must be at least 8 characters and include upper, lower, and a digit" });
        }

        const existingByEmail = await User.findOne({ email });
        const existingByUsername = await User.findOne({ username });

        if (existingByEmail && existingByUsername) {
            return res.status(400).json({ msg: "Username and email already used" });
        }
        if (existingByUsername) {
            return res.status(400).json({ msg: "Username already used" });
        }
        if (existingByEmail) {
            return res.status(400).json({ msg: "Email already used" });
        }

        const hashed = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password: hashed
        });

        return res.json({ token: signToken(user._id.toString()) });
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!isValidEmail(email) || typeof password !== "string" || !password.trim()) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid credentials" });

        return res.json({ token: signToken(user._id.toString()) });
    } catch {
        return res.status(500).json({ msg: "Server error" });
    }
};
