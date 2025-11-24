import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/passwordHashing";

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

    if (req.body.username) updates.username = req.body.username;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.description) updates.description = req.body.description;
    if (req.body.image) updates.image = req.body.image;
    if (req.body.badge) updates.badge = req.body.badge;

    if (req.body.password) {
        updates.password = await hashPassword(req.body.password);
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
