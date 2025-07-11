const mongoose = require("mongoose");
require("dotenv").config();

// Admin Schema Definition
const adminSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"],
    },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admins", adminSchema);
