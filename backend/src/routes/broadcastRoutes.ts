import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
    getBroadcasts,
    createBroadcast,
    voteBroadcast
} from "../controllers/broadcastController";

const router = express.Router();

router.get("/", protect, getBroadcasts);
router.post("/", protect, createBroadcast);
router.post("/:id/vote", protect, voteBroadcast);

export default router;
