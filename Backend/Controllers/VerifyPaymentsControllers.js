const crypto = require("crypto");
const Products = require("../Models/Products");
const Notifications = require("../Models/Notifications");

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    consumerId,
    cartItems,
    amount,
  } = req.body;

  try {
    // Step 1: Verify payment signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_SECRET_kEY)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature, payment verification failed",
      });
    }

    // console.log("Payment verified successfully");

    // Step 2: Reduce product quantities and send notifications
    for (let i = 0; i < cartItems.length; i++) {
      const { productId, quantity, name } = cartItems[i];

      // Update product quantity
      const product = await Products.findOne({ productId });
      if (!product) continue;

      await Products.updateOne(
        { productId },
        {
          $inc: { quantity: -quantity },
        }
      );

      // Create notification
      const notificationMessage = `Your product "${name}" with quantity ${quantity} has been ordered by a customer.`;

      await Notifications.create({
        farmerId: product.farmerId,
        productId,
        message: notificationMessage,
      });
    }

    // Step 3: Return success response
    return res.status(200).json({
      success: true,
      message: "Payment verified and processed successfully",
      paymentId: razorpay_payment_id,
      consumerId,
    });
  } catch (error) {
    console.log(" Error in verifyPayment:", error);
    res.status(500).json({
      success: false,
      message: "Server error during payment verification",
    });
  }
};

module.exports = verifyPayment;
