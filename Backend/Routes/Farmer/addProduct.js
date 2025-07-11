const express = require("express");
const addProduct = require("../../Controllers/Farmer/UploadProducts");
const addProductRouter = express.Router();
addProductRouter.post("/addproduct", addProduct);
module.exports = addProductRouter;
