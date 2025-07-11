const {
  loginFarmer,
  loginConsumer,
  loginAdmin,
} = require("../Controllers/LoginController");
const express = require("express");
const SearchRouter = express.Router();
SearchRouter.post("/consumer-login", loginConsumer);
SearchRouter.post("/admin-login", loginAdmin);
SearchRouter.post("/farmer-login", loginFarmer);
module.exports = SearchRouter;
