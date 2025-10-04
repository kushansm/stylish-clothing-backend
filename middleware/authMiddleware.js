import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(401).json({ message: "Not authorized" });
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        // optionally load user
        req.userObj = await User.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalid or expired" });
    }
};
