// require("dotenv").config();
// const mongoose = require("mongoose");

// // Utility function to generate a unique order ID
// function generateOrderId() {
//   const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random
//   const timestamp = Date.now().toString().slice(-6); // last 6 digits of timestamp
//   return `ORD${timestamp}${random}`;
// }

// // Define the order schema
// const orderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//     default: generateOrderId,
//     unique: true,
//   },
//   CustomerId: String,
//   product: String,
//   quantity: Number,
//   price: String,
//   status: {
//     type: String,
//     default: "Pending",
//   },
//   date: {
//     type: String,
//     default: () => new Date().toISOString().split("T")[0],
//   },
//   farmerId: String,
//   paymentMethod: {
//     type: String,
//     enum: ["UPI", "Cash on Delivery", "Credit Card", "Net Banking", "Wallet"],
//     required: true,
//   },
//   transactionId: {
//     type: String,
//     default: null,
//   },
// });

// // Create the model
// const Order = mongoose.model("Order", orderSchema);

// // Test data for farmerId "FARM127293"
// const testOrders = [
//   {
//     CustomerId: "CUST1001",
//     product: "Basmati Rice",
//     quantity: 50,
//     price: "₹2000",
//     farmerId: "FARM127293",
//     paymentMethod: "UPI",
//     transactionId: "TXN100001",
//   },
//   {
//     CustomerId: "CUST1002",
//     product: "Fresh Carrots",
//     quantity: 25,
//     price: "₹500",
//     farmerId: "FARM127293",
//     paymentMethod: "Cash on Delivery",
//     transactionId: null,
//   },
//   {
//     CustomerId: "CUST1003",
//     product: "Green Chillies",
//     quantity: 10,
//     price: "₹300",
//     farmerId: "FARM127293",
//     paymentMethod: "Wallet",
//     transactionId: "TXN100002",
//   },
// ];

// // Function to insert test data
// const insertTestOrders = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("✅ MongoDB connected");

//     // Optional: Remove old test data for clean insert
//     await Order.deleteMany({ farmerId: "FARM127293" });

//     await Order.insertMany(testOrders);
//     console.log("✅ Test orders inserted successfully for FARM127293");
//   } catch (err) {
//     console.error("❌ Error inserting test orders:", err);
//   } finally {
//     await mongoose.disconnect();
//     console.log("🔌 MongoDB disconnected");
//   }
// };

// // Execute if run directly
// if (require.main === module) {
//   insertTestOrders();
// }

// // Export model if needed elsewhere
// module.exports = Order;
