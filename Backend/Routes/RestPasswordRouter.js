const {
  resetFarmerPassword,
  resetUserPassword,
  resetAdminPassword,
} = require("../Controllers/ResetPassword");
const express = require("express");
const ResetPassRouter = express.Router();
ResetPassRouter.post("/reset-passwordfarm", resetFarmerPassword);
ResetPassRouter.post("/reset-passwordCons", resetUserPassword);
ResetPassRouter.post("/reset-passwordadmin", resetAdminPassword);
module.exports = ResetPassRouter;
