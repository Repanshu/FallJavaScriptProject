const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Home Page
router.get("/", (req, res) => {
    res.render("login");
});

// Products Listing Page
router.get("/product", async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.render("products", { products });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Add Product Page
router.get("/add-product", (req, res) => {
    res.render("add-product");
});

// Handle Add Product Form Submission
router.post("/product", async (req, res) => {
    const { name, brand, price, category, stock } = req.body;
    try {
        await Product.create({ name, brand, price, category, stock });
        res.redirect("/products");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding product");
    }
});

// Edit Product Page
router.get("/edit/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render("edit-product", { product });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving product");
    }
});

// Handle Edit Product Form Submission
router.put("/product/:id", async (req, res) => {
    const { name, brand, price, category, stock } = req.body;
    try {
        await Product.findByIdAndUpdate(req.params.id, { name, brand, price, category, stock });
        res.redirect("/products");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating product");
    }
});

// Handle Delete Product
router.delete("/product/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect("/products");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting product");
    }
});

module.exports = router;
