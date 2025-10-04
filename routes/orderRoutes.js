// routes/orderRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/checkout", protect, placeOrder);

export default router;
