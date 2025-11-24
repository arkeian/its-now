import { Request, Response } from "express";
import Thread from "../models/Thread";
import { sanitize } from "../utils/inputSanitation";

export const getThreads = async (req: Request, res: Response) => {
    const { sort = "best", tag, search } = req.query;

    let query: any = {};

    if (tag) query.tags = tag;
    if (search) query.title = { $regex: search, $options: "i" };

    let threads = await Thread.find(query).populate("user");

    if (sort === "best") {
        threads = threads.sort((a, b) => b.upvotes.length - a.upvotes.length);
    }
    else if (sort === "recent") {
        threads = threads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    else if (sort === "controversial") {
        threads = threads.sort((a, b) => b.downvotes.length - a.downvotes.length);
    }
    else if (sort === "hot") {
        threads = threads.sort((a, b) => (b.upvotes.length + b.downvotes.length) - (a.upvotes.length + a.downvotes.length));
    }

    res.json(threads);
};

export const getThread = async (req: Request, res: Response) => {
    const thread = await Thread.findById(req.params.id).populate("user");
    return thread ? res.json(thread) : res.status(404).json({ msg: "Not found" });
};

export const createThread = async (req: Request, res: Response) => {
    const { title, body, image, tags } = req.body;

    const thread = await Thread.create({
        title: sanitize(title),
        body: sanitize(body),
        image,
        tags,
        user: (req as any).user
    });

    res.json(thread);
};

export const voteThread = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).json({ msg: "Not found" });

    const { type } = req.body;

    thread.upvotes = thread.upvotes.filter((u: any) => u.toString() !== user);
    thread.downvotes = thread.downvotes.filter((u: any) => u.toString() !== user);

    if (type === "up") thread.upvotes.push(user);
    if (type === "down") thread.downvotes.push(user);

    await thread.save();

    res.json(thread);
};
