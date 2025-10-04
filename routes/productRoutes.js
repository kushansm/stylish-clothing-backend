import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts); // all products with filters
router.get("/:id", getProductById); // single product detail

export default router;
