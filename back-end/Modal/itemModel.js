// const mongoose = require("mongoose")

// const indiProductSchema = new mongoose.Schema(
//   {
//     name: String,
//     image: String,
//     rate: Number,
//     unit: String,
//     available: Boolean,
//     bestItem: Boolean
//   },{ _id: true }
// )

// const productsSchema = new mongoose.Schema({
//   VEGETABLES:{
//     type: [indiProductSchema]
//   },
//   "BAKING/SUGAR":{
//     type: [indiProductSchema]
//   }
//   ,
//   "FLOUR/SPICES":{
//     type: [indiProductSchema]
//   }
//   ,
//   "GRAINS/LENTILS":{
//     type: [indiProductSchema]
//   }
//   ,
//   "OILS/SAUCE":{
//     type: [indiProductSchema]
//   }
//   ,
//   "CARE/CLEANING":{
//     type: [indiProductSchema]
//   }
//   ,
//   "DRINK/CHIPS":{
//     type: [indiProductSchema]
//   }
//   ,
//   "DRYFRUITS/BISCUIT":{
//     type: [indiProductSchema]
//   }
// })

// const  products = mongoose.model("products",productsSchema);

// module.exports = products;





// const mongoose = require("mongoose");

// const indiProductSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   rate: Number,
//   unit: String,
//   available: Boolean,
//   bestItem: Boolean,
// }, { _id: true }); // Explicitly ensure each product inside the array has an _id

// const productsSchema = new mongoose.Schema({
//   VEGETABLES: {
//     type: [indiProductSchema],
//   },
//   "BAKING/SUGAR": {
//     type: [indiProductSchema],
//   },
//   "FLOUR/SPICES": {
//     type: [indiProductSchema],
//   },
//   "GRAINS/LENTILS": {
//     type: [indiProductSchema],
//   },
//   "OILS/SAUCE": {
//     type: [indiProductSchema],
//   },
//   "CARE/CLEANING": {
//     type: [indiProductSchema],
//   },
//   "DRINK/CHIPS": {
//     type: [indiProductSchema],
//   },
//   "DRYFRUITS/BISCUIT": {
//     type: [indiProductSchema],
//   },
// });

// const products = mongoose.model("products", productsSchema);

// module.exports = products;




const mongoose = require("mongoose");

const indiProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  rate: Number,
  unit: String,
  available: Boolean,
  bestItem: Boolean,
}, { _id: true }); // Explicitly ensure each product inside the array has an _id

const productsSchema = new mongoose.Schema({
  VEGETABLES: {
    type: [indiProductSchema],
  },
  "BAKING/SUGAR": {
    type: [indiProductSchema],
  },
  "FLOUR/SPICES": {
    type: [indiProductSchema],
  },
  "GRAINS/LENTILS": {
    type: [indiProductSchema],
  },
  "OILS/SAUCE": {
    type: [indiProductSchema],
  },
  "CARE/CLEANING": {
    type: [indiProductSchema],
  },
  "DRINK/CHIPS": {
    type: [indiProductSchema],
  },
  "DRYFRUITS/BISCUIT": {
    type: [indiProductSchema],
  },
});

const products = mongoose.model("products", productsSchema);

module.exports = products;
