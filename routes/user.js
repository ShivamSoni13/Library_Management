const express = require("express");
const router = express.Router();
const User = require("../model/User.js");

// Post Request for registering a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, age, address, phone, createdAt, feeStatus } =
      req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        error: "User already registered",
      });
    } else {
      const newUser = await User.create({
        username,
        email,
        age,
        address,
        phone,
        createdAt,
        feeStatus,
      });
      res.status(201).json({ user: newUser });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "User not registered" });
  }
});

// Define the route to get all registered users
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the route to get a single registered user by ID
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check fee Status and Update it
router.put('/update-fee-status/:userId', async (req, res) => {
  const { userId } = req.params;
  const { feeStatus } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fee status
    user.feeStatus = feeStatus;
    await user.save();

    return res.status(200).json({ message: 'Fee status updated successfully', user });
  } catch (error) {
    console.error('Error updating fee status:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete user endpoint
router.delete('/delete-user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.remove();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
