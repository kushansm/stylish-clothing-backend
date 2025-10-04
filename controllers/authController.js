import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name,email,password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashed });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        newUser.password = undefined;
        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email,password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Missing" });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        user.password = undefined;
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
