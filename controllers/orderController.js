import User from "../models/User.js";
import Order from "../models/Order.js";

export const checkout = async (req, res) => {
    try {
        const userId = req.user;
        const { shippingAddress, paymentMethod } = req.body;

        const user = await User.findById(userId).populate("cart.product");
        if (!user || user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderItems = user.cart.map((item) => ({
            product: item.product._id,
            size: item.size,
            quantity: item.quantity,
            price: item.product.price,
        }));

        const totalPrice = orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const newOrder = await Order.create({
            user: userId,
            items: orderItems,
            total: totalPrice,
            status: "Pending",
            paymentStatus: "Pending",
            shippingAddress,
            paymentMethod: paymentMethod || "Cash on Delivery",
        });

        // Empty cart after checkout
        user.cart = [];
        await user.save();

        res.status(201).json({ message: "Order placed", order: newOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
