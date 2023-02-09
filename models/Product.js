const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array, required: true},
    size: { type: String },
    ingredients: {type: Array, required: true},
    price: { type: Number, required: true },
    buyShop: {
      type: Boolean,
      default: false,}
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);