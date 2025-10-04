import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: { type: String, enum: ["Men","Women","Kids"] },
    sizes: [String],
    stock: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
