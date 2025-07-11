const Order = require("../../Models/Orders.js");
const getFinanceData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const orders = await Order.find({ "cartItems.farmerId": farmerId });

    let totalRevenue = 0;
    let netProfit = 0;
    let balance = 0;
    let monthlyEarnings = new Array(12).fill(0);
    const recentTransactions = [];

    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        if (item.farmerId === farmerId) {
          const price = item.price;
          const month = new Date(order.orderedAt).getMonth();

          totalRevenue += price;
          if (order.paymentMethod === "Cash on Delivery") {
            balance += price;
          } else {
            netProfit += price;
          }

          monthlyEarnings[month] += price;

          recentTransactions.push({
            date: order.orderedAt,
            description: item.name,
            amount:
              order.paymentMethod === "Cash on Delivery"
                ? `-₹${price}`
                : `₹${price}`,
          });
        }
      });
    });

    // Sort and take latest 5 transactions
    recentTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      totalRevenue,
      netProfit,
      balance,
      monthlyEarnings,
      recentTransactions: recentTransactions.slice(0, 5),
    });
  } catch (error) {
    console.error("Finance fetch error:", error);
    res.status(500).json({ message: "Failed to fetch finance data." });
  }
};

module.exports = getFinanceData;
