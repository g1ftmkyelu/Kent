const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

exports.sendMail = async (Logo="https://firebasestorage.googleapis.com/v0/b/server-services-50a49.appspot.com/o/logo%2F%5Bremoval.ai%5D_abd4a3d0-84f8-4c0a-9c3a-8d1f3cedddcd-bbb.png?alt=media&token=0fd681c0-6d3e-4268-9410-f0e38ff2e316", subject, recipientEmail, message) => {
  console.log(Logo)
  try {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: recipientEmail,
      subject: subject,
      html: `
      <div style="max-width: 600px; margin: 0 auto; font-size: 16px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); text-align: center; padding: 20px; background-color: #f5f5f5; color: #333; border: 1px solid #ddd;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 20px;">
              <img src="${Logo}" alt="Logo" style="max-width: 200px; height: auto; display: block;" />
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #fff; color: #333; border-radius: 5px;">
              <h3 style="margin-top: 0; font-size: 22px; font-weight: bold; color: #333; font-family: Arial, Helvetica, sans-serif; line-height: 1.4;">
                ${subject}
              </h3>
              <p style="margin-bottom: 20px; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">
                ${message}
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td align="center" style="padding: 10px;">
  
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; background-color: #f5f5f5; color: #666; font-family: Arial, Helvetica, sans-serif;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("ERROR: ", err);
  }
};