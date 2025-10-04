import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        let { page = 1, limit = 10, category, size, minPrice, maxPrice, search } = req.query;
        page = Number(page) || 1; limit = Number(limit) || 10;
        const query = {};
        if (category) query.category = category;
        if (size) query.sizes = size;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
        const products = await Product.find(query).limit(limit).skip((page-1)*limit);
        const total = await Product.countDocuments(query);
        res.json({ products, total, page, pages: Math.ceil(total/limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const p = await Product.findById(req.params.id);
        if (!p) return res.status(404).json({ message: "Not found" });
        res.json(p);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
