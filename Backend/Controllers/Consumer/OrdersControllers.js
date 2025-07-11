const Order = require("../../Models/Orders");
const Products = require("../../Models/Products");
const Notifications = require("../../Models/Notifications");
getOrdersByConsumerId = async (req, res) => {
  try {
    const { consumerId } = req.params;
    const orders = await Order.find({ consumerId });
    const formattedOrders = orders.map((order) => ({
      orderId: order.orderId,
      orderStatus: order.orderStatus,
      orderDate: order.orderedAt,
      amount: order.amount,
      products: order.cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    }));
    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Server error fetching orders" });
  }
};
cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Step 1: Find the order
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Step 2: Extract product-related data
    const Quantity = order.cartItems.map((item) => item.quantity);
    const allProductIds = order.cartItems.map((item) => item.productId);
    const productNames = order.cartItems.map((item) => item.name);

    // Step 3: Restore product quantities
    for (let i = 0; i < allProductIds.length; i++) {
      await Products.updateOne(
        { productId: allProductIds[i] },
        {
          $inc: {
            quantity: Quantity[i],
          },
        }
      );
    }

    // Step 4: Fetch farmer IDs for each product
    const farmerIds = await Promise.all(
      allProductIds.map(async (productId) => {
        const product = await Products.findOne({ productId });
        return product?.farmerId || "UNKNOWN";
      })
    );

    // Step 5: Insert notifications for each farmer
    for (let i = 0; i < farmerIds.length; i++) {
      const newNotification = new Notifications({
        farmerId: farmerIds[i],
        message: `Your product "${productNames[i]}" in order ${orderId} was cancelled.`,
        productId: allProductIds[i],
      });

      await newNotification.save();
    }

    // Step 6: Cancel the order
    await Order.updateOne(
      { orderId },
      {
        $set: {
          orderStatus: "Cancelled",
        },
      }
    );

    res.status(200).json({ message: "Order cancelled and notifications sent" });
  } catch (err) {
    console.error("Error cancelling order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getOrdersByConsumerId, cancelOrder };
