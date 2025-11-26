import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
    getThreads,
    getThread,
    createThread,
    voteThread,
    updateThread,
    deleteThread,
} from "../controllers/threadController";

const router = express.Router();

router.get("/", protect, getThreads);
router.get("/:id", protect, getThread);
router.post("/", protect, createThread);
router.post("/:id/vote", protect, voteThread);
router.put("/:id", protect, updateThread);
router.delete("/:id", protect, deleteThread);

export default router;
