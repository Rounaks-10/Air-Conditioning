import { Parser } from "json2csv";
import productModel from "../models/product.model.js";

export const exportProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .populate("brand");

    const formatted = products.map((p) => ({
      name: p.name,
      price: p.price,
      discountPrice: p.discountPrice,
      stock: p.stock,
      brand: p.brand?.name,
      category: p.category?.name,
      description: p.description,
      specs: JSON.stringify(p.specs),
    }));

    const fields = [
      "name",
      "price",
      "discountPrice",
      "stock",
      "brand",
      "category",
      "description",
      "specs",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(formatted);

    res.header("Content-Type", "text/csv");
    res.attachment("products.csv");

    return res.send(csv);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};