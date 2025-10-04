import User from "../models/User.js";
import Order from "../models/Order.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail", // or whatever service; for production use proper SMTP / credentials
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOrderEmail = async (to, order) => {
    const itemsHtml = order.items.map(i => {
        return `<li>${i.product.name} — Size: ${i.size} × ${i.quantity} — $${i.price}</li>`;
    }).join("");
    const html = `
    <h2>Order Confirmation — ID: ${order._id}</h2>
    <p>Thank you! Here is your order summary:</p>
    <ul>${itemsHtml}</ul>
    <p>Total: $${order.total}</p>
    <p>Order date: ${order.createdAt}</p>
  `;
    await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to,
        subject: `Order Confirmation — ${order._id}`,
        html
    });
};

export const checkout = async (req, res) => {
    try {
        const userId = req.user;
        const { shippingAddress, paymentMethod } = req.body;
        const user = await User.findById(userId).populate("cart.product");
        if (!user || !user.cart.length) return res.status(400).json({ message: "Cart empty" });

        const orderItems = user.cart.map(i => ({
            product: i.product._id,
            size: i.size,
            quantity: i.quantity,
            price: i.product.price,
        }));

        const total = orderItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

        const newOrder = await Order.create({
            user: userId,
            items: orderItems,
            total,
            status: "Pending",
            paymentStatus: "Pending",
            shippingAddress,
            paymentMethod: paymentMethod || "COD",
        });

        // For email we want product details, populate
        const orderWithProducts = await Order.findById(newOrder._id).populate("items.product");
        // clear cart
        user.cart = [];
        await user.save();

        // Send confirmation email (best effort; if fails still respond success)
        try {
            await sendOrderEmail(user.email, orderWithProducts);
        } catch (mailErr) {
            console.error("Email sending failed:", mailErr);
        }

        res.status(201).json({ order: orderWithProducts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
