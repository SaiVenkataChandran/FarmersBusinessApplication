const {
  DisplayFarmers,
  DisplayUsers,
} = require("../../Controllers/AdminControllers/Registrations");
const express = require("express");
const RegistrationRouter = express.Router();
RegistrationRouter.post("/allfarmers", DisplayFarmers);
RegistrationRouter.post("/", DisplayUsers);

module.exports = RegistrationRouter;
