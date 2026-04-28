import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  phone: { type: String }, // 🔥 add this

  isVerified: { type: Boolean, default: false },

  emailOtp: { type: String },
  emailOtpExpire: { type: Date },

  phoneOtp: { type: String },
  phoneOtpExpire: { type: Date },

  cartData: { type: Object, default: {} },
}, { minimize: false });
const  userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel