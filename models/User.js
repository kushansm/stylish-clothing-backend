import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    size: { type: String, required: true, enum: ["S","M","L","XL"] },
    quantity: { type: Number, required: true, default: 1 },
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user","admin"], default: "user" },
    cart: [cartItemSchema],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
