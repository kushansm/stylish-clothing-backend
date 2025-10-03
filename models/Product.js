import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: { type: String, enum: ["Men", "Women", "Kids"] },
    sizes: [String], // ["S","M","L","XL"]
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
