// const express = require("express");
// const getProductsByFarmer = require("../../Controllers/Farmer/ViewProducts");
// const ViewProductsRouter = express.Router();
// ViewProductsRouter.post("/products/:id", getProductsByFarmer);
// module.exports = ViewProductsRouter;
const express = require("express");
const getProductsByFarmer = require("../../Controllers/Farmer/ViewProducts");
const ViewProductsRouter = express.Router();

// POST request to fetch products by farmer ID from request body
ViewProductsRouter.post("/products", getProductsByFarmer);

module.exports = ViewProductsRouter;
