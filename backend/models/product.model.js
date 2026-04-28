import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand"
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  price: { type: Number, required: true },
  discountPrice: {type:Number},
  stock: { type: Number, default: 0 },

  description: {type:String},

  images: {type:Array,required:true}, // simple array of URLs

  rating: { type: Number, default: 0 },

  // 🔥 Dynamic specs
  specs: {
    type: Map,
    of: String
  },
  newarrival:{
    type:Boolean,
    default:false,
  },
  offer:{
    type:Boolean,
    default:false,
  }

}, { timestamps: true });
const productModel=mongoose.model("Product", productSchema);

export default productModel;