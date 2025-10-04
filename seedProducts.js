import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
    { name: "Classic White T-Shirt", description: "Comfortable cotton tee", price: 15, image: "https://picsum.photos/seed/1/600/600", category: "Men", sizes: ["S", "M", "L", "XL"] },
    { name: "Slim Fit Jeans", description: "Blue slim jeans", price: 45, image: "https://picsum.photos/seed/2/600/600", category: "Men", sizes: ["M", "L", "XL"] },
    { name: "Women Summer Dress", description: "Light summer dress", price: 35, image: "https://picsum.photos/seed/3/600/600", category: "Women", sizes: ["S", "M", "L"] },
    { name: "Kids Hoodie", description: "Warm and cozy hoodie for kids", price: 20, image: "https://picsum.photos/seed/4/600/600", category: "Kids", sizes: ["S", "M"] },
    { name: "Denim Jacket", description: "Classic denim jacket", price: 60, image: "https://picsum.photos/seed/5/600/600", category: "Men", sizes: ["M", "L"] },
    { name: "Maxi Dress", description: "Elegant maxi dress for evening", price: 50, image: "https://picsum.photos/seed/6/600/600", category: "Women", sizes: ["M", "L", "XL"] },
    { name: "Polo Shirt", description: "Smart casual polo shirt", price: 25, image: "https://picsum.photos/seed/7/600/600", category: "Men", sizes: ["S", "M", "L"] },
    { name: "Cargo Pants", description: "Durable cargo pants", price: 40, image: "https://picsum.photos/seed/8/600/600", category: "Men", sizes: ["M", "L", "XL"] },
    { name: "Women Blouse", description: "Casual and stylish blouse", price: 30, image: "https://picsum.photos/seed/9/600/600", category: "Women", sizes: ["S", "M", "L"] },
    { name: "Kids Shorts", description: "Comfortable cotton shorts", price: 15, image: "https://picsum.photos/seed/10/600/600", category: "Kids", sizes: ["S", "M", "L"] },
    { name: "Leather Jacket", description: "Premium leather jacket", price: 120, image: "https://picsum.photos/seed/11/600/600", category: "Men", sizes: ["M", "L"] },
    { name: "Mini Skirt", description: "Trendy mini skirt", price: 25, image: "https://picsum.photos/seed/12/600/600", category: "Women", sizes: ["S", "M", "L"] },
    { name: "Hoodie", description: "Cozy unisex hoodie", price: 35, image: "https://picsum.photos/seed/13/600/600", category: "Men", sizes: ["M", "L", "XL"] },
    { name: "Chinos", description: "Smart casual chinos", price: 38, image: "https://picsum.photos/seed/14/600/600", category: "Men", sizes: ["M", "L"] },
    { name: "Women Cardigan", description: "Soft wool cardigan", price: 45, image: "https://picsum.photos/seed/15/600/600", category: "Women", sizes: ["S", "M", "L", "XL"] },
    { name: "Kids Pajamas", description: "Comfortable cotton pajamas", price: 18, image: "https://picsum.photos/seed/16/600/600", category: "Kids", sizes: ["S", "M"] },
    { name: "Men Suit", description: "Formal suit for men", price: 200, image: "https://picsum.photos/seed/17/600/600", category: "Men", sizes: ["M", "L", "XL"] },
    { name: "Evening Gown", description: "Elegant evening gown", price: 150, image: "https://picsum.photos/seed/18/600/600", category: "Women", sizes: ["M", "L"] },
    { name: "Track Pants", description: "Comfortable jogger pants", price: 30, image: "https://picsum.photos/seed/19/600/600", category: "Men", sizes: ["M", "L", "XL"] },
    { name: "Crop Top", description: "Trendy crop top", price: 22, image: "https://picsum.photos/seed/20/600/600", category: "Women", sizes: ["S", "M", "L"] },
];

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("Seeded products successfully");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding products:", err);
        process.exit(1);
    }
};

run();
