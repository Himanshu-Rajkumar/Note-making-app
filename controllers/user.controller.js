const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, role = "user", email, password } = req.body;


  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already registered" });
    }

    bcrypt.hash(password, 10, async (err, hashed) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const newUser = new User({ name, email, password: hashed, role });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!result) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        { userId: user._id, userName: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({ message: "Login successful", token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
