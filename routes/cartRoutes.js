import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addToCart,
    updateCartItem,
    removeFromCart,
    getCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove", protect, removeFromCart);

export default router;
