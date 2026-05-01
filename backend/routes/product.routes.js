import express from 'express'
import {listProduct,listHomeProducts,getFilters,addProduct,removeProduct,singleProduct} from "../controllers/product.controller.js"
import { exportProducts } from '../controllers/export.controller.js';
import upload from '../middleware/multer.middleware.js';
import adminAuth from '../middleware/adminauth.middleware.js';


const productRouter =express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRouter.post('/remove/:id',adminAuth,removeProduct)
productRouter.get('/single/:id',singleProduct)
productRouter.get('/filters', getFilters);
productRouter.get('/list',listProduct)
productRouter.get('/export',exportProducts)
productRouter.get('/listspecial',listHomeProducts)



export default productRouter