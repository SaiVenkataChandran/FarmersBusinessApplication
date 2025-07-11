const getNotifications = require("../../Controllers/Farmer/NotificationControllers");
const express = require("express");
const NotificationsRouter = express.Router();
NotificationsRouter.get("/:farmerId", getNotifications);
module.exports = NotificationsRouter;
