import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ msg: "Not authorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
            id: string;
        };

        (req as any).user = decoded.id;
        next();
    } catch {
        return res.status(401).json({ msg: "Invalid token" });
    }
};
