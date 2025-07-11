// const Product = require("../../Models/Products");
// const Notification = require("../../Models/Notifications");
// const updateProductStatus = async (req, res) => {
//   const { productId } = req.params;
//   const { status } = req.body;

//   if (status === "Approved") {
//     try {
//       const product = await Product.findOneAndUpdate(
//         { productId },
//         { isVerified: "Approved" },
//         { new: true }
//       );

//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       res.status(200).json({
//         message: `Product ${productId} has been approved`,
//         product: product,
//       });
//     } catch (error) {
//       console.error("Error approving product:", error);
//       res.status(500).json({ message: "Error approving product" });
//     }
//   } else if (status === "Rejected") {
//     try {
//       const product = await Product.findOneAndDelete({ productId });

//       if (!product) {
//         return res.status(404).json({ message: "Product not found" });
//       }

//       res.status(200).json({
//         message: `Product ${productId} has been rejected and deleted`,
//       });
//     } catch (error) {
//       console.error("Error rejecting product:", error);
//       res.status(500).json({ message: "Error rejecting product" });
//     }
//   } else {
//     res
//       .status(400)
//       .json({ message: 'Invalid action. Use "Approved" or "Rejected".' });
//   }
// };

// module.exports = updateProductStatus;
const Product = require("../../Models/Products");
const Notification = require("../../Models/Notifications");

const updateProductStatus = async (req, res) => {
  const { productId } = req.params;
  const { status } = req.body;

  try {
    // Find product by productId to get farmerId and product name
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { farmerId, name: productName } = product;

    if (status === "Approved") {
      const updatedProduct = await Product.findOneAndUpdate(
        { productId },
        { isVerified: "Approved" },
        { new: true }
      );

      // Insert notification
      await Notification.create({
        farmerId,
        productId,
        message: `Your product "${productName}" has been approved and is now visible to customers.`,
      });

      return res.status(200).json({
        message: `Product ${productId} has been approved`,
        product: updatedProduct,
      });
    } else if (status === "Rejected") {
      await Product.findOneAndDelete({ productId });

      // Insert notification
      await Notification.create({
        farmerId,
        productId,
        message: `Your product "${productName}" has been rejected and removed from the system.`,
      });

      return res.status(200).json({
        message: `Product ${productId} has been rejected and deleted`,
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Invalid action. Use "Approved" or "Rejected".' });
    }
  } catch (error) {
    console.error("Error updating product status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateProductStatus;
