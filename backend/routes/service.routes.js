import express from "express";
import { bookService } from "../controllers/service.controller.js";

const serviceRouter = express.Router();

serviceRouter.post("/book", bookService);

export default serviceRouter;