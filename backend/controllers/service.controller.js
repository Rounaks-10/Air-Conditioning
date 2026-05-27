import { sendServiceBookingEmail } from "../utils/sendEmail.js";


const bookService = async (req, res) => {
  try {
    const { name, email, phone, service } = req.body;

    await sendServiceBookingEmail(
      name,
      email,
      phone,
      service,
    );
    res.json({
      success: true,
      message: "Service booked successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { bookService };