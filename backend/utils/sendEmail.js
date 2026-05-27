import SibApiV3Sdk from "sib-api-v3-sdk";

// Setup Brevo client
const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// Send OTP Email (same function name as your old one)
const sendEmailOTP = async (email, otp) => {
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

const sendOrderConfirmationEmail = async (
  user,
  items,
  amount,
  address,
) => {
  try {
    const productsHtml = items
      .map(
        (item) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd">
              ${item.name}
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ${item.quantity}
            </td>

            <td style="padding:8px;border:1px solid #ddd">
              ₹${Number(item.price).toLocaleString("en-IN")}
            </td>
          </tr>
        `,
      )
      .join("");

    const response =
      await tranEmailApi.sendTransacEmail({
        sender: {
          email: process.env.EMAIL,
          name: "AC Store",
        },

        to: [
          {
            email: user.email,
          },
        ],

        subject: "🎉 Order Confirmation",

        htmlContent: `
          <div style="font-family:sans-serif">

            <h2>🎉 Order Confirmed</h2>

            <p>
              Hi ${user.name},
            </p>

            <p>
              Your order has been placed successfully.
            </p>

            <h3>Order Details</h3>

            <table
              style="
                border-collapse:collapse;
                width:100%;
              "
            >
              <thead>
                <tr>
                  <th style="padding:8px;border:1px solid #ddd">
                    Product
                  </th>

                  <th style="padding:8px;border:1px solid #ddd">
                    Quantity
                  </th>

                  <th style="padding:8px;border:1px solid #ddd">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                ${productsHtml}
              </tbody>
            </table>

            <h3>
              Total Amount:
              ₹${Number(amount).toLocaleString("en-IN")}
            </h3>

            <h3>Delivery Address</h3>

            <p>
              ${address.firstName}
              ${address.lastName}
            </p>

            <p>${address.street}</p>

            <p>
              ${address.city},
              ${address.state}
            </p>

            <p>${address.zipcode}</p>

            <p>${address.country}</p>

            <p>
              📞 ${address.phone}
            </p>

            <br/>

            <p>
              Thank you for shopping with us ❤️
            </p>

          </div>
        `,
      });

    console.log(
      "Order Email Sent:",
      response.messageId,
    );
  } catch (error) {
    console.log(
      "Order Email Error:",
      error.response?.body || error.message,
    );
  }
};
const sendServiceBookingEmail = async (
  name,
  email,
  phone,
  service,
) => {
  try {
    const response =
      await tranEmailApi.sendTransacEmail({
        sender: {
          email: process.env.EMAIL,
          name: "AC Store",
        },

        to: [
          {
            email: process.env.EMAIL,
          },
        ],

        replyTo: {
          email,
          name,
        },

        subject: `New Service Request - ${service}`,

        htmlContent: `
          <div style="font-family:sans-serif">

            <h2>
              🛠️ New Service Booking
            </h2>

            <p>
              <strong>Name:</strong>
              ${name}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Phone:</strong>
              ${phone}
            </p>

            <p>
              <strong>Service:</strong>
              ${service}
            </p>

          </div>
        `,
      });

    console.log(
      "Service Email Sent:",
      response.messageId,
    );
  } catch (error) {
    console.log(
      "Service Email Error:",
      error.response?.body || error.message,
    );
  }
};

export {
  sendEmailOTP,
  sendOrderConfirmationEmail,
  sendServiceBookingEmail,
};