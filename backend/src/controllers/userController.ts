import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { hashPassword } from "../utils/passwordHashing";
import { isNonEmptyString, isValidEmail, isStrongPassword } from "../utils/inputValidators";

export const getSelf = async (req: Request, res: Response) => {
    const user = await User.findById((req as any).user).select("-password");
    return res.json(user);
};

export const getUserProfile = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select("-password -email");
    return user ? res.json(user) : res.status(404).json({ msg: "Not found" });
};

export const updateProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const updates: any = {};

    const { username, email, description, image, badge, password } = req.body;

    if (username !== undefined) {
        if (!isNonEmptyString(username, 32)) {
            return res.status(400).json({ msg: "Username must be non-empty and at most 32 characters" });
        }
        updates.username = username.trim();
    }

    if (email !== undefined) {
        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }
        updates.email = email.trim();
    }

    if (description !== undefined) {
        if (typeof description !== "string" || description.length > 1000) {
            return res.status(400).json({ msg: "Description must be a string up to 1000 characters" });
        }
        updates.description = description;
    }

    if (image !== undefined) {
        if (typeof image !== "string" || image.length > 1000) {
            return res.status(400).json({ msg: "Image must be a string URL up to 1000 characters" });
        }
        updates.image = image;
    }

    if (badge !== undefined) {
        if (typeof badge !== "string" || badge.length > 50) {
            return res.status(400).json({ msg: "Badge must be a string up to 50 characters" });
        }
        updates.badge = badge;
    }

    if (password !== undefined) {
        if (!isStrongPassword(password)) {
            return res.status(400).json({ msg: "Password must be at least 8 characters and include upper, lower, and a digit" });
        }
        updates.password = await hashPassword(password);
    }

    const updated = await User.findByIdAndUpdate(userId, updates, { new: true });
    return res.json(updated);
};

export const toggleBookmark = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const { threadId } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    const index = user.bookmarks.indexOf(threadId);

    if (index === -1) user.bookmarks.push(threadId);
    else user.bookmarks.splice(index, 1);

    await user.save();

    res.json({ bookmarks: user.bookmarks });
};

export const deleteSelf = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!password) {
        return res.status(400).json({ msg: "Password is required" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ msg: "Invalid password" });
    }

    await user.deleteOne();
    return res.json({ msg: "Account deleted" });
};
