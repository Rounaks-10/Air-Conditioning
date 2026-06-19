import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Product
from "../models/product.model.js";

import qdrant
from "../vector-db/qdrant.js";

import {
 createEmbedding
}
from "../services/embedding.service.js";

await mongoose.connect(
 process.env.MONGODB_URL
);

async function indexProducts(){

 const products = await Product.find();

 const points=[];
 let idx=1;
 for(const product of products){

  const text=`
   Product Name: ${product.name}
   Brand: ${product.brand}
   Price: ${product.price}
   Description: ${product.description}
   Category: ${product.category}
  `;

  const vector=await createEmbedding(text);

  points.push({
   id:idx++,
   vector,
   payload:{
     type:"product",
     text,
     productId:product._id.toString()
   }
  });
 }
console.log("Products found:", products.length);
console.log("Points created:", points.length);
 await qdrant.upsert(
   "ac_knowledge",
   {
    points
   }
 );

 console.log(
  "Products Indexed"
 );
}

indexProducts();