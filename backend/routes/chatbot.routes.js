import express
from "express";

import {
 chat
}
from "../controllers/chatbot.controller.js";
import authUser from "../middleware/auth.middleware.js"
const chatRouter = express.Router();

chatRouter.post(
 "/ask",authUser,
 chat 
);

export default chatRouter;