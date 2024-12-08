const express = require("express");
const cors = require("cors");
const server = express()
const mongoose = require("mongoose")
const orderDetail = require("./Modal/orderModel");
const port = 2081;
const products = require("./Modal/itemModel");
const adminDetail = require("./Modal/AdminModal");

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
server.put('/newbashyalgeneralstore/products/:id',async (req,res)=>{ 
  const { id } = req.params;
  const productDocument = await products.findOne({
    $or: [
      { "VEGETABLES._id": id },
      { "BAKING/SUGAR._id": id },
      { "FLOUR/SPICES._id": id },
      { "GRAINS/LENTILS._id": id },
      { "OILS/SAUCE._id": id },
      { "CARE/CLEANING._id": id },
      { "DRINK/CHIPS._id": id },
      { "DRYFRUITS/BISCUIT._id": id },
    ],
  });

  if (!productDocument) {
    return console.log("Product not found");
  }

  // Find the specific array and index where the product is located
  let updated = false;
  const keys = Object.keys(productDocument.toObject());
  for (const key of keys) {
    if (Array.isArray(productDocument[key])) {
      const index = productDocument[key].findIndex(
        (item) => item._id.toString() === id
      );
      if (index !== -1) {
        // Update the object with req.body
        productDocument[key][index] = {
          ...productDocument[key][index].toObject(),
          ...req.body,
        };
        updated = true;
        break;
      }
    }
  }

  if (updated) {
    await productDocument.save();
    console.log("Product updated successfully");
  } else {
    console.log("Product not found in any field");
  }


})



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



//admin username and password and notice and contact

server.get("/newbashyalgeneralstore/admindetail", async(req,res)=>{
  const data = await adminDetail.find();
  res.json(data);
})
server.put("/newbashyalgeneralstore/admindetail/:id", async(req,res)=>{
  const { id } = req.params;
  const updateData = req.body;
  const updatedData = await adminDetail.findByIdAndUpdate(id,updateData);
  if (!updatedData) {
    return res.status(404).json({ message: 'Resource not found' });
  }

  res.status(200).json( { message: 'Resource updated successfully' });

})


// Server Listen

server.listen(port, ()=>{
  console.log(`listening at port ${port}`);
  
})