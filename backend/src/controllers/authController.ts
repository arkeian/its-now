import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/passwordHashing";
import { signToken } from "../configs/jwt";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ msg: "Email already used" });

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

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid credentials" });

        return res.json({ token: signToken(user._id.toString()) });
    } catch {
        return res.status(500).json({ msg: "Server error" });
    }
};
