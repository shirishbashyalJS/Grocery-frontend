



const mongoose = require("mongoose");

const indiProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  rate: Number,
  unit: String,
  available: {
    type:Boolean,
  default: true},
  bestItem: {type:Boolean,default: false},
  type: String
}, { _id: true }); // Explicitly ensure each product inside the array has an _id



const products = mongoose.model("products", indiProductSchema);

module.exports = products;
