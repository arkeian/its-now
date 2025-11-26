import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/mongo";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import threadRoutes from "./routes/threadRoutes";
import commentRoutes from "./routes/commentRoutes";
import broadcastRoutes from "./routes/broadcastRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/broadcasts", broadcastRoutes);
app.use("/api/upload", uploadRoutes);

app.use((_, res) => {
    res.status(404).json({ msg: "Not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Backend running on port", PORT));
