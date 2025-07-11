const mongoose = require("mongoose");

const consumerSchema = new mongoose.Schema({
  consumerId: {
    type: String,
    unique: true,
  },
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  phone: { type: String },
  otp: { type: String }, // OTP for email verification
  register_in: { type: Date, default: Date.now },
  otpExpiresAt: { type: Date },
  address: String,
});

// Generate Consumer ID before saving
consumerSchema.pre("save", async function (next) {
  if (!this.consumerId) {
    const random = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
    this.consumerId = `CUST${random}`;
  }
  next();
});

module.exports = mongoose.model("users", consumerSchema);
