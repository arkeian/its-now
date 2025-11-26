import { Request, Response } from "express";
import Thread from "../models/Thread";
import { sanitize } from "../utils/htmlSanitation";

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
    const { title, body, image, video, tags } = req.body;

    const thread = await Thread.create({
        title: sanitize(title),
        body: sanitize(body),
        image,
        video,
        tags,
        user: (req as any).user
    });

    const populated = await Thread.findById(thread._id).populate("user");
    res.json(populated);
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

export const updateThread = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).json({ msg: "Not found" });
    if (thread.user.toString() !== userId) {
        return res.status(403).json({ msg: "Forbidden" });
    }

    const { title, body, image, video, tags } = req.body;

    if (title !== undefined) thread.title = sanitize(title);
    if (body !== undefined) thread.body = sanitize(body);
    if (image !== undefined) thread.image = image;
    if (video !== undefined) thread.video = video;
    if (tags !== undefined) thread.tags = tags;

    await thread.save();
    const populated = await Thread.findById(thread._id).populate("user");
    return res.json(populated);
};

export const deleteThread = async (req: Request, res: Response) => {
    const userId = (req as any).user;
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).json({ msg: "Not found" });
    if (thread.user.toString() !== userId) {
        return res.status(403).json({ msg: "Forbidden" });
    }

    await thread.deleteOne();
    return res.json({ msg: "Thread deleted" });
};
