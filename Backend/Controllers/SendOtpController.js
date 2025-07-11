const users = require("../Models/Consumer.js");
const Farmers = require("../Models/Farmer.js");
const Admins = require("../Models/Admin.js");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const SendOtpFarm = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(200).json({ message: "Email is required" });
    }

    // Check if the farmer exists
    const farmer = await Farmers.findOne({ email });
    if (!farmer) {
      return res
        .status(200)
        .json({ message: "Farmer not found with this email" });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = Date.now() + 2 * 60 * 1000; // 5 minutes from now

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Farmers Market" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is: <b>${otp}</b></p><p>This OTP is valid for 2 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    // Save the OTP and its expiration in the farmer's document
    farmer.otp = otp;
    farmer.otpExpiresAt = otpExpiresAt;
    await farmer.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("SendOtp Error:", error);
    res.status(200).json({ message: "Failed to send OTP" });
  }
};

const SendOtpUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if the user exists
    const user = await users.findOne({ email });
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = Date.now() + 2 * 60 * 1000; // Valid for 5 minutes

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Farmers Market" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is: <b>${otp}</b></p><p>This OTP is valid for 2 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    // Save the OTP and expiry to the user's document
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;

    console.log("ugyewudsxhj", user);
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("SendOtpUser Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
const SendOtpAdmin = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(200).json({ message: "Username is required." });
    }

    const admin = await Admins.findOne({ username });

    if (!admin) {
      return res.status(200).json({ message: "Admin not found." });
    }

    const email = admin.email;

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save latest OTP and expiry time (2 minutes)
    admin.otp = otp;
    admin.otpExpiry = Date.now() + 2 * 60 * 1000; // Use 'otpExpiry' to match validation function
    await admin.save(); // ✅ OTP is now saved to DB

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Admin Password Reset",
      text: `Hello ${username},\n\nYour OTP for password reset is: ${otp}\nThis OTP is valid for 2 minutes.`,
    };

    // Send OTP email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(200).json({ message: "Failed to send OTP email." });
      } else {
        return res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error in SendOtpAdmin:", error);
    res.status(200).json({ message: "Internal server error" });
  }
};

module.exports = { SendOtpFarm, SendOtpUser, SendOtpAdmin };
