import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otp.js";
import { sendEmailOTP } from "../utils/sendEmail.js";
import { sendPhoneOTP } from "../utils/sendSms.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user.isVerified) {
      return res.json({
        success: false,
        message: "Please verify your email first",
      });
    }
    if (!user) {
      res.json({ success: false, message: "User do not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, message: "User login successfully", token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const signUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already exists" });
    }

    //Validating email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generate OTP
    const emailOtp = generateOTP();
    const phoneOtp = generateOTP();

    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      emailOtp,
      phoneOtp,
      emailOtpExpire: Date.now() + 5 * 60 * 1000,
      phoneOtpExpire: Date.now() + 5 * 60 * 1000,
    });

    // send OTP
    await sendEmailOTP(email, emailOtp);
    // await sendPhoneOTP(phone, phoneOtp);

    res.json({
      success: true,
      message: "OTP sent",
      userId: user._id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { userId, emailOtp } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.emailOtp !== emailOtp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.emailOtpExpire < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isVerified = true;
    user.emailOtp = null;

    await user.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      message: "Verified successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, signUser,verifyUser, adminLogin };
