import express
from "express";

import {
 chat
}
from "../controllers/chatbot.controller.js";

const chatRouter = express.Router();

chatRouter.post(
 "/ask",
 chat 
);

export default chatRouter;