// controllers/AdminControllers/farmerApprovalController.js
const Farmer = require("../../Models/Farmer");

const approveFarmer = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Farmer.findOneAndUpdate(
      { farmerId: id },
      { isVerified: "Approved" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ message: "Farmer approved", farmer: updated });
  } catch (err) {
    console.error("Error approving farmer:", err);
    res.status(500).json({ message: "Server error during approval" });
  }
};
const rejectFarmer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFarmer = await Farmer.findOneAndDelete({ farmerId: id });

    if (!deletedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res
      .status(200)
      .json({ message: "Farmer rejected and deleted", farmer: deletedFarmer });
  } catch (err) {
    console.error("Error rejecting and deleting farmer:", err);
    res.status(500).json({ message: "Server error during rejection" });
  }
};

module.exports = { approveFarmer, rejectFarmer };
