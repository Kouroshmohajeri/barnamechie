import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // To load environment variables from .env

// Create a transporter using the email service credentials from the environment
const transporter = nodemailer.createTransport({
  service: "gmail", // Change to your preferred email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address (e.g., 'youremail@gmail.com')
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

const sendEmail = async (to, subject, textContent, htmlContent = null) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to, // recipient
    subject, // dynamic subject line
    text: textContent, // dynamic plain text body
    html: htmlContent, // dynamic HTML body (optional)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return true;
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    return false;
  }
};

export default sendEmail;
