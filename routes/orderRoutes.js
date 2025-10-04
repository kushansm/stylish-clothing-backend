import express from "express";
import { checkout } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Checkout route
router.post("/checkout", protect, checkout);

// Test route
router.get("/", (req, res) => {
    res.send("Order route working");
});

export default router;
