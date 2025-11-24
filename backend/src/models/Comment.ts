import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
        parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
        body: { type: String, required: true },
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
