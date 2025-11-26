import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
    getComments,
    createComment,
    voteComment,
    updateComment,
    deleteComment,
} from "../controllers/commentController";

const router = express.Router();

// Thread comments
router.get("/threads/:threadId", protect, getComments);
router.post("/threads/:threadId", protect, createComment);

// Broadcast comments
router.get("/broadcasts/:broadcastId", protect, getComments);
router.post("/broadcasts/:broadcastId", protect, createComment);
router.post("/vote/:id", protect, voteComment);
router.put("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);

export default router;
