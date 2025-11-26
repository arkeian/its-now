import { Request, Response } from "express";
import Broadcast from "../models/Broadcast";
import { sanitize } from "../utils/htmlSanitation";

export const getBroadcasts = async (_: Request, res: Response) => {
    const broadcasts = await Broadcast.find().populate("user");
    res.json(broadcasts);
};

export const getBroadcast = async (req: Request, res: Response) => {
    const broadcast = await Broadcast.findById(req.params.id).populate("user");
    return broadcast ? res.json(broadcast) : res.status(404).json({ msg: "Not found" });
};

export const createBroadcast = async (req: Request, res: Response) => {
    const { title, body, image, video, tags } = req.body;

    const post = await Broadcast.create({
        title: sanitize(title),
        body: sanitize(body),
        image,
        video,
        tags,
        user: (req as any).user
    });

    const populated = await Broadcast.findById(post._id).populate("user");
    res.json(populated);
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

    const populated = await Broadcast.findById(post._id).populate("user");
    res.json(populated);
};

export const updateBroadcast = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const post = await Broadcast.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Not found" });
    if (post.user.toString() !== userId) {
        return res.status(403).json({ msg: "Forbidden" });
    }

    const { title, body, image, video, tags } = req.body;

    if (title !== undefined) post.title = sanitize(title);
    if (body !== undefined) post.body = sanitize(body);
    if (image !== undefined) post.image = image;
    if (video !== undefined) post.video = video;
    if (tags !== undefined) post.tags = tags;

    await post.save();
    const populated = await Broadcast.findById(post._id).populate("user");
    return res.json(populated);
};

export const deleteBroadcast = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const post = await Broadcast.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Not found" });
    if (post.user.toString() !== userId) {
        return res.status(403).json({ msg: "Forbidden" });
    }

    await post.deleteOne();
    return res.json({ msg: "Broadcast deleted" });
};
