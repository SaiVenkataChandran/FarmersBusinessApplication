const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  consumerId: {
    type: String, // Changed from ObjectId to String
    required: true,
  },
  
  farmerId: {
    type: String, // Changed from ObjectId to String
    required: true,
  },
  productId: {
    type: String, // Changed from ObjectId to String
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: Prevent adding the same product multiple times for a single consumer

module.exports = mongoose.model("Cart", cartSchema);
