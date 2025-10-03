export const getProducts = async (req, res) => {
    const { page = 1, limit = 10, category, size, minPrice, maxPrice, search } = req.query;

    const query = {};
    if (category) query.category = category;
    if (size) query.sizes = size;
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };
    if (search) query.name = { $regex: search, $options: "i" };

    const products = await Product.find(query)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

    const count = await Product.countDocuments(query);
    res.json({ products, total: count, page: Number(page), pages: Math.ceil(count / limit) });
};
