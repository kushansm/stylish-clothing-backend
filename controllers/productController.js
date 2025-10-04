import Product from "../models/Product.js";

// Get all products with filters, search, and pagination
export const getProducts = async (req, res) => {
    try {
        let { page = 1, limit = 10, category, size, minPrice, maxPrice, search } = req.query;

        page = Number(page) || 1;
        limit = Number(limit) || 10;

        const query = {};

        if (category) query.category = category;
        if (size) query.sizes = size;

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) query.name = { $regex: search, $options: "i" };

        const products = await Product.find(query)
            .limit(limit)
            .skip((page - 1) * limit);

        const count = await Product.countDocuments(query);

        res.json({
            products,
            total: count,
            page,
            pages: Math.ceil(count / limit),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
