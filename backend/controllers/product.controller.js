import productModel from "../models/product.model.js";
import brandModel from "../models/brand.model.js";
import categoryModel from "../models/category.model.js";
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req, res) => {
  try {
    let {
      name,
      brand,
      category,
      subcategory,
      price,
      discountPrice,
      stock,
      description,
      specs,
      newarrival,
      offer,
    } = req.body;

    const isNewArrival = newarrival === "true";
    const isOffer = offer === "true";

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let brandDoc = await brandModel.findOne({ name: brand });

    if (!brandDoc) {
      brandDoc = await brandModel.create({ name: brand });
    }

    // CATEGORY (PARENT)
    let parentCategory = await categoryModel.findOne({
      name: category,
      parent: null,
    });

    if (!parentCategory) {
      parentCategory = await categoryModel.create({
        name: category,
        parent: null,
      });
    }

    // SUBCATEGORY (CHILD)
    let subCategoryDoc = await categoryModel.findOne({
      name: subcategory,
      parent: parentCategory._id,
    });

    if (!subCategoryDoc) {
      subCategoryDoc = await categoryModel.create({
        name: subcategory,
        parent: parentCategory._id,
      });
    }
    let imageurl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );
    console.log(imageurl);

    let parsedSpecs = {};

    if (req.body.specs) {
      parsedSpecs = JSON.parse(req.body.specs);
    }
    console.log(parsedSpecs);

    // Basic validation
    if (!name || !price || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }
    const product = await productModel.create({
      name,
      brand: brandDoc._id,
      category: subCategoryDoc._id,
      price,
      discountPrice,
      stock,
      description,
      images: imageurl,
      specs: parsedSpecs,
      newarrival: isNewArrival,
      offer: isOffer,
    });

    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("brand") // 🔥 ADD THIS
      .populate("category"); // 🔥 ADD THIS

    if (!product) {
      return res.json({ success: false, message: "Not found" });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    let filter = {};

    // CATEGORY
    if (req.query.category) {
      const categoryDoc = await categoryModel.findOne({
        name: req.query.category,
      });
      if (categoryDoc) filter.category = categoryDoc._id;
    }

    // BRAND
    if (req.query.brand) {
      const brandDoc = await brandModel.findOne({
        name: req.query.brand,
      });
      if (brandDoc) filter.brand = brandDoc._id;
    }
    //Price
    

    // 🔥 DYNAMIC SPECS FILTER
    Object.keys(req.query).forEach((key) => {
      if (!["category", "brand"].includes(key)) {
        const values = req.query[key].split(",");
        filter[`specs.${key}`] = { $in: values };
      }
    });

    const products = await productModel
      .find(filter)
      .populate("brand")
      .populate("category");

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getFilters = async (req, res) => {
  try {
    let filter = {};

    if (req.query.category) {
      const categoryDoc = await categoryModel.findOne({
        name: req.query.category,
      });

      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    const products = await productModel.find(filter);

    let filters = {};

    products.forEach((p) => {
      if (p.specs) {
        p.specs.forEach((value, key) => {
          if (!filters[key]) filters[key] = new Set();
          filters[key].add(value);
        });
      }
    });

    const keys = Object.keys(filters).slice(0, 10);

    let limitedFilters = {};

    keys.forEach((key) => {
      limitedFilters[key] = Array.from(filters[key]);
    });

    res.json({
      success: true,
      filters: limitedFilters,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const listHomeProducts = async (req, res) => {
  try {
    // 🔥 Fetch both in parallel (fast)
    const [newProducts, offerProducts] = await Promise.all([
      productModel
        .find({ newarrival: true })
        .populate("brand category")
        .sort({ createdAt: -1 })
        .limit(10),

      productModel
        .find({ offer: true, discountPrice: { $gt: 0 } })
        .populate("brand category")
        .sort({ createdAt: -1 })
        .limit(10),
    ]);

    res.json({
      success: true,
      newProducts,
      offerProducts,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  listProduct,
  listHomeProducts,
  getFilters,
  addProduct,
  removeProduct,
  singleProduct,
};
