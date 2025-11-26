import express from "express";
import { Request, Response } from "express";

const router = express.Router();

const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif"]; // adjust if you want to drop GIFs

const parseDataUri = (dataUri: string) => {
    const match = /^data:([^;]+);base64,(.+)$/.exec(dataUri || "");
    if (!match) return null;
    const mime = match[1];
    const base64 = match[2];
    return { mime, base64 };
};

router.post("/", async (req: Request, res: Response) => {
    const { image } = req.body as { image?: string };

    if (!image || typeof image !== "string") {
        return res.status(400).json({ msg: "Image is required" });
    }

    const parsed = parseDataUri(image);
    if (!parsed) {
        return res.status(400).json({ msg: "Invalid image data" });
    }

    if (!ALLOWED_MIME_TYPES.includes(parsed.mime)) {
        return res.status(400).json({ msg: "Unsupported image type" });
    }

    // At this point you could persist the decoded buffer to disk/cloud storage.
    // For now, echo the data URI back as the URL so existing frontend keeps working.
    return res.json({ url: image });
});

export default router;
