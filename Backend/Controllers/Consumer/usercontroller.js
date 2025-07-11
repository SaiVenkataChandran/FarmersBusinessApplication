const express = require("express");
const consumerModel = require("../../Models/Consumer");

const addUser = async (req, res) => {
  const { fullName, email, password, phone, address } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await consumerModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email Already Exists" }); // Exit after sending response
    }

    // Create a new user
    const data = await consumerModel.create({
      fullName,
      email,
      password,
      phone,
      address,
    });
    return res.status(201).json({ message: "Data Inserted", data }); // Exit after sending response
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Error", err });
    // Exit after sending response
  }
};

module.exports = addUser;
