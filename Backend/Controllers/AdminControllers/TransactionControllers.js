const Order = require("../../Models/Orders");
const User = require("../../Models/Consumer"); // adjust the path as needed

const getPayments = async (req, res) => {
  try {
    const orders = await Order.find();
    const allConsumerIds = [
      ...new Set(orders.map((order) => order.consumerId)),
    ];

    const users = await User.find({
      consumerId: { $in: allConsumerIds },
    });

    const userMap = {};
    users.forEach((user) => {
      userMap[user.consumerId] = user.fullName;
    });

    const payments = orders.map((order) => ({
      paymentId: order.paymentId,
      fullName: userMap[order.consumerId] || "Unknown",
      amount: `₹${order.amount}`,
      orderedAt: order.orderedAt,
    }));

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getPayments;
