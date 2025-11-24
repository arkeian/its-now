import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
    getThreads,
    getThread,
    createThread,
    voteThread
} from "../controllers/threadController";

const router = express.Router();

router.get("/", protect, getThreads);
router.get("/:id", protect, getThread);
router.post("/", protect, createThread);
router.post("/:id/vote", protect, voteThread);

export default router;
