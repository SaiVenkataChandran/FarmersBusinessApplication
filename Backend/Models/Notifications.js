const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    productId: {
      type: String, // assuming it's a string (like UUID or ObjectId in string format)
      required: false, // make it optional if some notifications aren't product-related
    },
  },
  { timestamps: true } // adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Notification", notificationSchema);
