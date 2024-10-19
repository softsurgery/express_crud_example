const mongoose = require("mongoose");

const PurchaseSchema = mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true }, 
  purchaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);