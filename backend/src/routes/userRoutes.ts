import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
    getSelf,
    getUserProfile,
    updateProfile,
    toggleBookmark,
    deleteSelf,
} from "../controllers/userController";

const router = express.Router();

router.get("/me", protect, getSelf);
router.get("/:id", protect, getUserProfile);
router.put("/edit", protect, updateProfile);
router.post("/bookmark", protect, toggleBookmark);
router.delete("/me", protect, deleteSelf);

export default router;
