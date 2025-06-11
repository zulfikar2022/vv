import { environmentVariables } from "../../environments/environmentAccess.js";
import { transporter } from "./transporter.js";

export async function sendVerificationEmail(userEmail, userId) {
  const verifyLink = `${environmentVariables.base_url_prod}/api/users/verification/${userId}`;

  const mailOptions = {
    from: '"ViralVabi" <noreply@viralvabi.com>',
    to: userEmail,
    subject: "Verify Your Email - ViralVabi",
    text: `Please verify your email by clicking: ${verifyLink}`,
    html: `
      <p>Welcome to ViralVabi!</p>
      <p>Please verify your email address by clicking the button below:</p>
      <a href="${verifyLink}" style="display:inline-block; padding:10px 20px; background-color:#007BFF; color:#fff; text-decoration:none; border-radius:5px;">Verify Email</a>
      <p>If the button doesn't work, copy and paste this link in your browser:</p>
      <p>${verifyLink}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
