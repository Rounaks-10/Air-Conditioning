import qdrant from "../vector-db/qdrant.js";
import {createEmbedding} from "./embedding.service.js";

export async function retrieveDocs(
 query
){

 const vector =
 await createEmbedding(query);

 const result =
 await qdrant.search(
  "ac_knowledge",
  {
    vector,
    limit:5
  }
 );

 return result;
}