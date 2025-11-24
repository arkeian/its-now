import mongoose from "mongoose";

const broadcastSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        image: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        tags: [
            {
                type: String,
                enum: [
                    "Event", "Recruitment", "Academic", "Scholarships", "Research",
                    "News", "Career", "Politic", "Sports"
                ]
            }
        ],
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    { timestamps: true }
);

export default mongoose.model("Broadcast", broadcastSchema);
