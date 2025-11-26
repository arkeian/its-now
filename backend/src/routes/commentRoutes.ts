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

router.get("/:threadId", protect, getComments);
router.post("/:threadId", protect, createComment);
router.post("/vote/:id", protect, voteComment);
router.put("/:id", protect, updateComment);
router.delete("/:id", protect, deleteComment);

export default router;
