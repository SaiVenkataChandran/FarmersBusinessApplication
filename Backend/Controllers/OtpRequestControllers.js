const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load .env variables

const generateOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = crypto.randomInt(100000, 999999).toString();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    console.log("OTP sent to:", email);
    res.json({ otp, message: "OTP sent to email successfully" });
  } catch (error) {
    console.error("OTP Error:", error);
    res.status(500).json({ error: "Failed to generate/send OTP" });
  }
};

module.exports = generateOTP;
