import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
    getBroadcasts,
    createBroadcast,
    voteBroadcast,
    updateBroadcast,
    deleteBroadcast,
} from "../controllers/broadcastController";

const router = express.Router();

router.get("/", protect, getBroadcasts);
router.post("/", protect, createBroadcast);
router.post("/:id/vote", protect, voteBroadcast);
router.put("/:id", protect, updateBroadcast);
router.delete("/:id", protect, deleteBroadcast);

export default router;
