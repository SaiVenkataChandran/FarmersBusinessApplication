const {
  checkEmailExistsFarm,
  checkEmailExistsCons,
  CheckAdminExists,
  checkEmailExistsFarmR,
  checkEmailExistsConsR,
} = require("../Controllers/EmailCheck");
const express = require("express");
const emailCheckRouter = express.Router();
emailCheckRouter.post("/check-emailfarm", checkEmailExistsFarm);
emailCheckRouter.post("/check-emailCons", checkEmailExistsCons);
emailCheckRouter.post("/check-usernameadmin", CheckAdminExists);
emailCheckRouter.post("/check-emailfarmr", checkEmailExistsFarmR);
emailCheckRouter.post("/check-emailConsr", checkEmailExistsConsR);
module.exports = emailCheckRouter;
