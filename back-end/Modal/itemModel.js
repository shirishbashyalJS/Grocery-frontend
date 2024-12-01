const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    rate: Number,
    unit: String,
    available: Boolean
  }
)


const  products = mongoose.model("products",productsSchema);

module.exports = products;