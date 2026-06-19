import dotenv from "dotenv";
dotenv.config();

import qdrant
from "../vector-db/qdrant.js";

await qdrant.createCollection(
 "ac_knowledge",
 {
  vectors:{
   size:1536,
   distance:"Cosine"
  }
 }
);

console.log(
 "Collection Created"
);