import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        image: { type: String },
        video: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        tags: [
            {
                type: String,
                enum: [
                    "Lost & Found", "Study Tips", "Event", "Recruitment", "Sports",
                    "Casual", "Exchange", "Q&A", "Advice", "Discussion",
                    "Memes", "Research", "Hobbies", "Career", "Clubs",
                    "Politic", "News", "Academic"
                ]
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Thread", threadSchema);
