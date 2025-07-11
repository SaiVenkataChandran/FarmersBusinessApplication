const razorpay = require("./Razorpay");
const createOrder = async (req, res) => {
  const { amount, currency = "INR", consumerId } = req.body;
  try {
    const options = {
      amount: amount * 100,
      currency,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Payment initiation failed" });
  }
};

module.exports = createOrder;
