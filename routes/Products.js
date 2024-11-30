const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

// Home Page
router.get("/", (req, res) => {
    res.render("index");
});
router.get("/view-product", async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.render("view-product", { products }); // Render the view-products EJS page
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Sign-Up Route
router.post('/index', async (req, res) => {
    const { name, age, city, email, username, password } = req.body;

    try {
        // Create new user (no hashing)
        const newUser = new User({
            name,
            age,
            city,
            email,
            username,
            password // Store password as plain text (not recommended in real applications)
        });

        // Save the user to the database
        await newUser.save();

        res.redirect('/product');
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Error signing up user");
    }
});

// Products Listing Page
router.get("/product", async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from MongoDB
        res.render("product", { products });
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
router.post("/add-product", async (req, res) => {
    const { name, brand, price, category, image } = req.body;
    try {
        await Product.create({ name, brand, price, category, image });
        res.redirect("/product");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding product");
    }
});

// Edit Product Page
router.get("/edit/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Fetch the product by ID
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.render("edit", { product });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving product");
    }
});

// Update Product
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, brand, price, category, stock, image } = req.body;

    try {
        // Find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, brand, price, category, stock, image }, { new: true });

        // Redirect to the products page
        res.redirect('/product');
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Handle Delete Product
router.post("/delete/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Delete product by ID
        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }
        res.redirect("/product");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting product");
    }
});

module.exports = router;
