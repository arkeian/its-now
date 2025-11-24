import { Request, Response } from "express";
import Comment from "../models/Comment";
import { sanitize } from "../utils/inputSanitation";

export const getComments = async (req: Request, res: Response) => {
    const comments = await Comment.find({ thread: req.params.threadId }).populate("user");
    res.json(comments);
};

export const createComment = async (req: Request, res: Response) => {
    const { body, parent } = req.body;

    const comment = await Comment.create({
        body: sanitize(body),
        parent,
        thread: req.params.threadId,
        user: (req as any).user
    });

    res.json(comment);
};

export const voteComment = async (req: Request, res: Response) => {
    const com = await Comment.findById(req.params.id);
    if (!com) return res.status(404).json({ msg: "Not found" });

    const user = (req as any).user;
    const { type } = req.body;

    com.upvotes = com.upvotes.filter((u: any) => u.toString() !== user);
    com.downvotes = com.downvotes.filter((u: any) => u.toString() !== user);

    if (type === "up") com.upvotes.push(user);
    if (type === "down") com.downvotes.push(user);

    await com.save();
    res.json(com);
};
