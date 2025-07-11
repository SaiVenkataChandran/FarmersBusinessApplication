const express = require("express");
const addUser = require(".././Controllers/Consumer/usercontroller");

const consumerRouter = express.Router();

consumerRouter.post("/adduser", addUser);

module.exports = consumerRouter;
