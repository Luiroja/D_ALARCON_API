const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    desc: { type: String },
    img: { type: String },
    category: { type: String},
    events: { type: Array},
    size: { type: Array },
    ingredients: {type: Array},
    price: { type: Number },
    inStock: { 
      type: Boolean,
      default: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);