const Order = require("../Models/Orders");
const Cart = require("../Models/Cart");
const addOrder = async (req, res) => {
  try {
    // Destructure the fields from the request body with the correct names
    const {
      consumerId,
      cartItems,
      amount,
      razorpay_payment_id,
      razorpay_order_id,
      Payment_type,
    } = req.body;

    // Ensure all necessary fields are present
    if (
      !consumerId ||
      !cartItems ||
      !razorpay_payment_id ||
      !razorpay_order_id
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newOrder = new Order({
      consumerId,
      cartItems,
      amount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      Payment_type,
    });
    await newOrder.save();
    await Cart.deleteMany({ consumerId });
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
};

module.exports = addOrder;
