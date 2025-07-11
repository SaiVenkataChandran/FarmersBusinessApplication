const Farmer = require("../Models/Farmer");
const users = require("../Models/Consumer");

const getFarmerDetails = async (req, res) => {
  const farmerId = req.params.farmerId;
  try {
    const farmer = await Farmer.findOne({ farmerId }).select(
      "fullName email password aadharNo address phone photo"
    );
    if (!farmer) {
      return res.status(200).json({ message: "Farmer not found" });
    }

    res.status(200).json(farmer);
  } catch (error) {
    console.error("Error fetching farmer details:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateFarmer = async (req, res) => {
  try {
    const { fullName, address, phone, email, aadharNo } = req.body;
    const farmerId = req.params.id;

    // Step 1: Check if another farmer has this email
    const existingFarmer = await Farmer.findOne({
      email,
      farmerId: { $ne: farmerId },
    });

    if (existingFarmer) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    // Step 2: Update the farmer using farmerId
    const updatedFarmer = await Farmer.findOneAndUpdate(
      { farmerId },
      {
        $set: { fullName, address, phone, email, aadharNo },
      },
      { new: true }
    );

    if (!updatedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.json(updatedFarmer);
  } catch (error) {
    console.error("Error updating farmer:", error);
    res.status(500).json({ message: "Failed to update profile", error });
  }
};
// Get consumer profile by email (no auth used)
const getConsumerDetails = async (req, res) => {
  const { consumerId } = req.params;
  if (!consumerId) {
    return res
      .status(400)
      .json({ success: false, message: "consumerId is required" });
  }

  try {
    const consumer = await users.findOne({
      consumerId,
    });
    if (!consumer) {
      return res
        .status(200)
        .json({ success: false, message: "Consumer not found" });
    }

    res.status(200).json({ success: true, data: consumer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getFarmerDetails, updateFarmer, getConsumerDetails };
