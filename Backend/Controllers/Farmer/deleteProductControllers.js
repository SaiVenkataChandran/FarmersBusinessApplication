const Product = require("../../Models/Products");
const Notification = require("../../Models/Notifications");

// Fetch image URL by product ID
const getImageUrl = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ imageUrl: product.image });
  } catch (err) {
    res.status(500).json({ message: "Error fetching image URL" });
  }
};

// Delete product (image is deleted on frontend)
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    // Add deletion notification
    const notification = new Notification({
      farmerId: deletedProduct.farmerId,
      productId: deletedProduct.productId, // this is your custom ID if defined in the schema
      message: `Your product "${deletedProduct.name}" was deleted.`,
    });

    await notification.save();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = { getImageUrl, deleteProduct };
