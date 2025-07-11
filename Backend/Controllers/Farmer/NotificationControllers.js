const Notification = require("../../Models/Notifications");

const getNotifications = async (req, res) => {
  const { farmerId } = req.params;
  try {
    const notifications = await Notification.find({ farmerId }).sort({
      createdAt: -1,
    });
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getNotifications;
