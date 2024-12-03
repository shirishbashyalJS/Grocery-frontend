const mongoose = require("mongoose")

const adminModalSchema = new mongoose.Schema({
  notice: {type:String},
  admin:{
    username: {type:String},
    password: {type:String}
  },
  contact: {type:String}
})

const  adminDetail = mongoose.model("admins",adminModalSchema);

module.exports = adminDetail;