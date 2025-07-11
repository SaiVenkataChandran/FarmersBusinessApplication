const Cart = require("../../Models/Cart");
const Product = require("../../Models/Products");

// POST: Add product to cart
const addToCart = async (req, res) => {
  const { consumerId, productId, quantity } = req.body;

  try {
    // Fetch the product to get the farmerId
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const farmerId = product.farmerId;

    // Check if item already exists in cart
    const existingItem = await Cart.findOne({ consumerId, productId });
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res
        .status(200)
        .json({ message: "Cart updated", cartItem: existingItem });
    }

    const newItem = new Cart({
      farmerId, // Save the farmerId to the cart
      consumerId,
      productId,
      quantity: quantity || 1,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added to cart", cartItem: newItem });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

const getCartDetails = async (req, res) => {
  try {
    const { consumerId } = req.params;
    //console.log(consumerId);
    // Step 1: Get all cart entries for this consumer
    const cartItems = await Cart.find({ consumerId });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    // Step 2: Extract productIds from cart
    const productIds = cartItems.map((item) => item.productId);

    // Step 3: Fetch all matching products from products collection
    const products = await Product.find({ productId: { $in: productIds } });
    // Step 4: Merge quantity from cart with each product
    console.log(products);
    const detailedCart = products.map((product) => {
      const matchingCartItem = cartItems.find(
        (item) => item.productId === product.productId
      );
      return {
        farmerId: product.farmerId,
        productId: product.productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: matchingCartItem?.quantity || 1,
      };
    });

    res.status(200).json({ cartItems: detailedCart });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching cart items." });
  }
};
// PATCH /api/cart/:consumerId/:productId
const updateCartQuantity = async (req, res) => {
  try {
    const { consumerId, productId } = req.params;
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1." });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { consumerId, productId },
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    res
      .status(200)
      .json({ message: "Quantity updated", cartItem: updatedCart });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteCartItem = async (req, res) => {
  try {
    const { consumerId, productId } = req.params;

    const deleted = await Cart.findOneAndDelete({ consumerId, productId });
    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports = {
  getCartDetails,
  addToCart,
  updateCartQuantity,
  deleteCartItem,
};
