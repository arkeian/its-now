import { Request, Response } from "express";
import Broadcast from "../models/Broadcast";
import { sanitize } from "../utils/inputSanitation";

export const getBroadcasts = async (_: Request, res: Response) => {
    const broadcasts = await Broadcast.find().populate("user");
    res.json(broadcasts);
};

export const createBroadcast = async (req: Request, res: Response) => {
    const { title, body, image, tags } = req.body;

    const post = await Broadcast.create({
        title: sanitize(title),
        body: sanitize(body),
        image,
        tags,
        user: (req as any).user
    });

    res.json(post);
};

export const voteBroadcast = async (req: Request, res: Response) => {
    const post = await Broadcast.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Not found" });

    const user = (req as any).user;
    const { type } = req.body;

    post.upvotes = post.upvotes.filter((u: any) => u.toString() !== user);
    post.downvotes = post.downvotes.filter((u: any) => u.toString() !== user);

    if (type === "up") post.upvotes.push(user);
    if (type === "down") post.downvotes.push(user);

    await post.save();
    res.json(post);
};
