const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  consumerId: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      farmerId: String,
      productId: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  Payment_type: {
    type: String,
    default: "Online Payment",
  },
  orderStatus: {
    type: String,
    enum: ["Ordered", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Ordered",
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
