const Purchase = require("../models/purchase.model.js");
const Product = require("../models/product.model.js");

// Create and Save a new Purchase
exports.create = async (req, res) => {
  try {
    if (!req.body.products || !Array.isArray(req.body.products) || req.body.products.length === 0) {
      return res.status(400).send({
        message: "Purchase must include at least one product with quantity",
      });
    }

    let totalPrice = 0;

    // Loop through the products and calculate the total price
    const products = await Promise.all(
      req.body.products.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product not found with id ${item.productId}`);
        }

        if (item.quantity > product.quantity) {
          throw new Error(`Insufficient quantity for product: ${product.name}`);
        }

        totalPrice += product.price * item.quantity;

        product.quantity -= item.quantity;
        await product.save();

        return {
          product: product._id,
          quantity: item.quantity,
        };
      })
    );

    // Create the Purchase
    const purchase = new Purchase({
      products: products,
      totalPrice: totalPrice,
    });

    const savedPurchase = await purchase.save();
    res.send(savedPurchase);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the purchase.",
    });
  }
};

// Retrieve all purchases
exports.findAll = (req, res) => {
  Purchase.find()
    .populate("products.product")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving purchases.",
      });
    });
};

// Find a single purchase by its purchaseId
exports.findOne = (req, res) => {
  Purchase.findById(req.params.purchaseId)
    .populate("products.product") // Populate product details
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Purchase not found with id " + req.params.purchaseId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Purchase not found with id " + req.params.purchaseId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving purchase with id " + req.params.purchaseId,
      });
    });
};