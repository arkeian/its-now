import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        badge: { type: String, default: "" },
        bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }]
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
