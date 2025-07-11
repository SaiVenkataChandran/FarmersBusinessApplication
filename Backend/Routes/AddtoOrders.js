const addOrder = require("../Controllers/Orderscontrollers");
const express = require("express");
const AddtoordersRouter = express.Router();
AddtoordersRouter.post("/addOrder", addOrder);
module.exports = AddtoordersRouter;
