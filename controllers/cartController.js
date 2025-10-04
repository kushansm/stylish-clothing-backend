import User from "../models/User.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user;
        const { productId, size, quantity = 1 } = req.body;
        if (!productId || !size) return res.status(400).json({ message: "Missing product/size" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const user = await User.findById(userId);
        const found = user.cart.find(i => i.product.toString() === productId && i.size === size);
        if (found) found.quantity += Number(quantity);
        else user.cart.push({ product: productId, size, quantity: Number(quantity) });

        await user.save();
        const populated = await user.populate("cart.product");
        res.json({ cart: populated.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const { productId, size, quantity } = req.body;
        const item = user.cart.find(i => i.product.toString() === productId && i.size === size);
        if (!item) return res.status(404).json({ message: "Not in cart" });
        item.quantity = Number(quantity);
        await user.save();
        const populated = await user.populate("cart.product");
        res.json({ cart: populated.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const { productId, size } = req.body;
        user.cart = user.cart.filter(i => !(i.product.toString() === productId && i.size === size));
        await user.save();
        const populated = await user.populate("cart.product");
        res.json({ cart: populated.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user).populate("cart.product");
        res.json({ cart: user.cart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
