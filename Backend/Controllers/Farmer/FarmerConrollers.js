// const Farmer = require("../../Models/Farmer");

// const addfarmer = async (req, res) => {
//   try {
//     const { fullName, email, phone, password, address, aadharNo } = req.body;
//     // Create a new farmer document
//     const newFarmer = new Farmer({
//       fullName,
//       email,
//       phone,
//       password,
//       address,
//       aadharNo,
//     });

//     // Save to MongoDB
//     const savedFarmer = await newFarmer.save();

//     res.status(201).json({
//       message: "Farmer registered successfully!",
//       farmer: savedFarmer,
//     });
//   } catch (err) {
//     console.error("Error adding farmer:", err);
//     res.status(500).json({ message: "Server error while adding farmer." });
//   }
// };

// module.exports = addfarmer;
const Farmer = require("../../Models/Farmer");

const addfarmer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      address,
      aadharNo,
      accountNumber,
      ifscCode,
    } = req.body;

    // Create a new farmer document with accountNumber and ifscCode
    const newFarmer = new Farmer({
      fullName,
      email,
      phone,
      password,
      address,
      aadharNo,
      accountNumber,
      ifscCode,
    });

    // Save to MongoDB
    const savedFarmer = await newFarmer.save();

    res.status(201).json({
      message: "Farmer registered successfully!",
      farmer: savedFarmer,
    });
  } catch (err) {
    console.error("Error adding farmer:", err);
    res.status(500).json({ message: "Server error while adding farmer." });
  }
};

module.exports = addfarmer;
