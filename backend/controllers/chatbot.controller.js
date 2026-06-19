import {
 retrieveDocs
}
from "../services/retrieval.service.js";

import {
 askLLM
}
from "../services/chat.service.js";

export const chat =
async(req,res)=>{

 try{

  const {message} =
  req.body;

  const docs =
  await retrieveDocs(
   message
  );

  const context =
  docs
  .map(
   doc =>
   doc.payload.text
  )
  .join("\n\n");

  const answer =
  await askLLM(
   message,
   context
  );

  return res.status(200).json({
   success:true,
   answer
  });

 }catch(error){

  console.log(error);

  return res.status(500).json({
   success:false,
   message:error.message
  });
 }
};