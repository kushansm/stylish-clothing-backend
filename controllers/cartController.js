import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, size, minPrice, maxPrice, search } = req.query;

        const query = {};
        if (category) query.category = category;
        if (size) query.sizes = size;
        if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
        if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
        if (search) query.name = { $regex: search, $options: "i" };

        const products = await Product.find(query)
            .limit(Number(limit) || 10)
            .skip((Number(page) - 1) * (Number(limit) || 10));

        const count = await Product.countDocuments(query);
        res.json({
            products,
            total: count,
            page: Number(page),
            pages: Math.ceil(count / (Number(limit) || 10)),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
