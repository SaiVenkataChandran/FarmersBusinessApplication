const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  farmerId: {
    type: String,
    unique: true,
  },
  fullName: String,
  email: String,
  phone: String,
  password: String,
  otp: String,
  address: String,
  aadharNo: String,
  otpExpiresAt: Date,
  photo: {
    type: String, // Store image URL or file path
    default: "", // Optional default
  },
  isVerified: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  register_in: { type: Date, default: Date.now },
  accountNumber: {
    type: String,
    required: true, // Add validation if needed
  },
  ifscCode: {
    type: String,
    required: true, // Add validation if needed
  },
});

// Generate Farmer ID before saving
farmerSchema.pre("save", async function (next) {
  if (!this.farmerId) {
    const random = Math.floor(100000 + Math.random() * 900000); // 6-digit number
    this.farmerId = `FARM${random}`;
  }
  next();
});

module.exports = mongoose.model("Farmers", farmerSchema);
