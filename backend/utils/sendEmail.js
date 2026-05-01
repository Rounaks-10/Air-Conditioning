import SibApiV3Sdk from "sib-api-v3-sdk";

// Setup Brevo client
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// Send OTP Email (same function name as your old one)
export const sendEmailOTP = async (email, otp) => {
  try {
    const response = await tranEmailApi.sendTransacEmail({
      sender: {
        email: process.env.EMAIL, // must be verified in Brevo
        name: "Your Store",
      },
      to: [{ email: email }],
      subject: "Verify your Email",
      textContent: `Your OTP is ${otp}`,
      htmlContent: `
        <div style="font-family:sans-serif">
          <h2>🔐 Verify your Email</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("Email sent:", response.messageId);
  } catch (error) {
    console.log("Email error:", error.response?.body || error.message);
  }
};