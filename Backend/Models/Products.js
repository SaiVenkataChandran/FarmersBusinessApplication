const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
    },
    name: String,
    category: String,
    description: String,
    price: Number,
    quantity: Number,
    contact: String,
    image: String,
    farmerId: {
      type: String,
      required: true,
    },
    isVerified: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// 👇 Pre-save middleware to generate custom productId if not present
productSchema.pre("save", function (next) {
  if (!this.productId) {
    const timestamp = Date.now();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    this.productId = `PROD${randomNum}`;
  }
  next();
});

module.exports = mongoose.model("products", productSchema);
