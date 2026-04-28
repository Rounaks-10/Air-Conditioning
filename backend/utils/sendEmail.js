import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailOTP = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Store" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify your Email",
      text: `Your OTP is ${otp}`,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Email error:", error);
  }
};