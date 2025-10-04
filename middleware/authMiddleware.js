// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) return next(); // allow guest checkout

        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.id; // user ID
        req.userObj = await User.findById(decoded.id).select("-password"); // full user
        next();
    } catch (err) {
        next(); // allow guest checkout even if token is invalid
    }
};
