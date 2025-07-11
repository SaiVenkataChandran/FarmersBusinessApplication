const Orders = require("../../Models/Orders");

const getTxndetails = async (req, res) => {
  try {
    const orders = await Orders.find({}); // Fetch all orders

    const transactions = orders.map((order) => ({
      customerId: order.consumerId,
      transactionId: order.paymentId || order.orderId,
      date: order.orderedAt,
      amount: order.amount,
    }));

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};

module.exports = getTxndetails;
