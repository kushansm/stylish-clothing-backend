import User from "../models/User.js";
import Product from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user; // from middleware
        const { productId, size, quantity } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Check if item already in cart
        const existingItem = user.cart.find(
            (item) => item.product.toString() === productId && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, size, quantity });
        }

        await user.save();
        res.json({ message: "Item added to cart", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update item quantity
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user;
        const { productId, size, quantity } = req.body;

        const user = await User.findById(userId);
        const item = user.cart.find(
            (item) => item.product.toString() === productId && item.size === size
        );

        if (!item) return res.status(404).json({ message: "Item not found in cart" });

        item.quantity = quantity;
        await user.save();

        res.json({ message: "Cart updated", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user;
        const { productId, size } = req.body;

        const user = await User.findById(userId);
        user.cart = user.cart.filter(
            (item) => !(item.product.toString() === productId && item.size === size)
        );

        await user.save();
        res.json({ message: "Item removed", cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).populate("cart.product");
        res.json({ cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
