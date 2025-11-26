import { Request, Response } from "express";
import Comment from "../models/Comment";
import Thread from "../models/Thread";
import Broadcast from "../models/Broadcast";
import { sanitize } from "../utils/inputSanitation";

export const getComments = async (req: Request, res: Response) => {
    const { threadId, broadcastId } = req.params as { threadId?: string; broadcastId?: string };

    const query: any = {};
    if (threadId) query.thread = threadId;
    if (broadcastId) query.broadcast = broadcastId;

    const comments = await Comment.find(query).populate("user");
    res.json(comments);
};

export const createComment = async (req: Request, res: Response) => {
    const { body, parent } = req.body;
    const { threadId, broadcastId } = req.params as { threadId?: string; broadcastId?: string };

    const payload: any = {
        body: sanitize(body),
        parent,
        user: (req as any).user,
    };

    if (threadId) payload.thread = threadId;
    if (broadcastId) payload.broadcast = broadcastId;

    const comment = await Comment.create(payload);

    if (threadId) {
        await Thread.findByIdAndUpdate(threadId, { $inc: { commentsCount: 1 } });
    }
    if (broadcastId) {
        await Broadcast.findByIdAndUpdate(broadcastId, { $inc: { commentsCount: 1 } });
    }

    const populated = await Comment.findById(comment._id).populate("user");
    res.json(populated);
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

export const updateComment = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ msg: "Not found" });
    if (comment.user.toString() !== userId) {
        return res.status(403).json({ msg: "Forbidden" });
    }

    const { body } = req.body;
    if (body !== undefined) comment.body = sanitize(body);

    await comment.save();
    const populated = await Comment.findById(comment._id).populate("user");
    return res.json(populated);
};

export const deleteComment = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ msg: "Not found" });
    if (comment.user.toString() !== userId) {
        return res.status(403).json({ msg: "Forbidden" });
    }

    // Delete the comment and all its descendant replies
    const toDeleteIds: string[] = [comment._id.toString()];

    // Breadth-first search for all descendants by parent chain
    let queue: string[] = [comment._id.toString()];
    while (queue.length > 0) {
        const currentParent = queue.shift()!;
        const children = await Comment.find({ parent: currentParent });
        for (const child of children) {
            const idStr = child._id.toString();
            toDeleteIds.push(idStr);
            queue.push(idStr);
        }
    }

    await Comment.deleteMany({ _id: { $in: toDeleteIds } });

    if (comment.thread) {
        await Thread.findByIdAndUpdate(comment.thread, { $inc: { commentsCount: -toDeleteIds.length } });
    }
    if (comment.broadcast) {
        await Broadcast.findByIdAndUpdate(comment.broadcast, { $inc: { commentsCount: -toDeleteIds.length } });
    }

    return res.json({ msg: "Comment deleted" });
};
