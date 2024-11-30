const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };

    exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        brand: req.body.brand,
        description: req.body.description,
        ingredients: req.body.ingredients
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    };

    exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    };

    exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};