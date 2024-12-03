const express = require("express");
const cors = require("cors");
const server = express()
const mongoose = require("mongoose")
const orderDetail = require("./Modal/orderModel");
const port = 2081;
const products = require("./Modal/itemModel");

server.use(cors());
server.use(express.json()) 

mongoose.connect('mongodb://localhost:27017/Grocery').then((e) =>
  console.log('db connect') 
).catch((err) =>
  console.log(err)
);
 
//Products

server.get('/newbashyalgeneralstore/products',async (req,res)=>{
  const productsInfo = await products.find();
  res.json(productsInfo)
})
// server.get('/newbashyalgeneralstore/products/:name',async (req,res)=>{
//   const name = req.params;
//   const productInfo = await products.find();
//   res.json(productsInfo)
// })


// OrderedItems

server.post("/newbashyalgeneralstore/orderedItems",async (req,res)=> {
  try{
    let userOrder = new orderDetail({
      items: req.body.items,
      DeliverLocation: req.body.DeliverLocation,
      PersonInformation: req.body.PersonInformation,
      OrderAmount: req.body.OrderAmount
    });
    const order = await userOrder.save();
    
    res.status(201).send(order);
    
  }
  catch(err){
    console.error("error in saving data", err);
    res.status(500).send({error:"failed to save the order"});
  } 
})

server.get('/newbashyalgeneralstore/orderedItems', async (req,res)=>{
  const order = await orderDetail.find();
  
  res.json(order);
})
server.delete("/newbashyalgeneralstore/orderedItems/:id",async(req,res)=>{
  try {
    const { id } = req.params;

    // Find and delete the order by its ID
    const deletedOrder = await orderDetail.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).send({ error: "Order not found" })
    }

    res.status(200).send({ message: "Order deleted successfully", deletedOrder });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).send({ error: "Failed to delete the order" });
  }
  
})




// Server Listen

server.listen(port, ()=>{
  console.log(`listening at port ${port}`);
  
})