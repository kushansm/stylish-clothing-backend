import Order from "../models/Order.js";
import nodemailer from "nodemailer";

export const placeOrder = async (req, res) => {
    const { items, total, shippingAddress, paymentMethod, email } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    try {
        const userId = req.userObj?._id; // undefined if guest

        // Create order
        const order = await Order.create({
            user: userId || undefined,
            items,
            total,
            shippingAddress,
            paymentStatus: "Pending",
            status: "Pending"
        });

        // Send confirmation email
        const recipientEmail = req.userObj?.email || email;
        if (recipientEmail) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: recipientEmail,
                subject: `Order Confirmation - ${order._id}`,
                html: `<h2>Thank you for your order!</h2>
                       <p>Order ID: ${order._id}</p>
                       <p>Total: $${total}</p>
                       <p>Shipping Address: ${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.country}</p>`,
            });
        }

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
