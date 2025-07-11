const updateProductStatus = require("../../Controllers/AdminControllers/UpdateProductsControllers");
const express = require("express");
const UpdateProductsRouter = express.Router();
UpdateProductsRouter.put("/products/verify/:productId", updateProductStatus);
module.exports = UpdateProductsRouter;
