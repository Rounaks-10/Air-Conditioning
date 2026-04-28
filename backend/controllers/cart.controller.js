import userModel from "../models/user.model.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added to cart",
      cartData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE CART
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, quantity } = req.body;

    const user = await userModel.findById(userId);
    let cartData = user.cartData || {};

    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET CART
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    res.json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };