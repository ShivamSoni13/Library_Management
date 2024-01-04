const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const schedule = require("node-schedule");

// Endpoint for registering a new user
router.post("/register", async (req, res) => {
  try {
    // Extract relevant data from the request body
    const { username, email, age, address, phone, father, shift, totalFee, feePaid } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Create a new user
    const newUser = await User.create({
      username,
      father,
      email,
      age,
      address,
      phone,
      shift,
      totalFee,
      feePaid,
    });

    // Respond with the newly created user
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "User not registered" });
  }
});

// Endpoint to get all registered users
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get a single registered user by ID
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

// Endpoint to update fee status
router.put("/update-fee-status/:userId", async (req, res) => {
  const { userId } = req.params;
  const { feeStatus, feePaid } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fee status and feePaid
    user.feeStatus = feeStatus;
    user.feePaid = feePaid;
    await user.save();

    return res.status(200).json({ message: "Fee status updated successfully", user });
  } catch (error) {
    console.error("Error updating fee status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to delete a user
router.delete("/delete-user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Check if the user exists
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to update user details
router.put("/update-user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, email, age, address, phone, father, shift, totalFee, feePaid } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.username = username || user.username;
    user.father = father || user.father;
    user.email = email || user.email;
    user.age = age || user.age;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.shift = shift || user.shift;
    user.totalFee = totalFee || user.totalFee;
    user.feePaid = feePaid || user.feePaid;

    await user.save();

    return res.status(200).json({ message: "User details updated successfully", user });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Assume you have a function renewSubscription(userId) that updates subscription date and feeStatus
async function renewSubscription(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return;
    }

    // Update subscription date to next month
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    user.subscriptionDate = nextMonth;

    // Change feeStatus to unpaid
    user.feeStatus = false;

    // Save the changes
    await user.save();

    console.log(`Subscription renewed for user ${userId}`);
  } catch (error) {
    console.error("Error renewing subscription:", error);
  }
}

// Schedule job to update feeStatus for all users monthly
schedule.scheduleJob("0 0 0 1 * *", async () => {
  try {
    // Get all users
    const users = await User.find();

    // Update feeStatus for each user
    users.forEach(async (user) => {
      // Check if a month has passed since the last fee update
      const lastFeeUpdate = user.lastFeeUpdate || user.createdAt;
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      if (lastFeeUpdate < oneMonthAgo) {
        // Update feeStatus
        user.feeStatus = false;
        user.lastFeeUpdate = new Date(); // Update the lastFeeUpdate field
        await user.save();
      }
    });

    console.log("FeeStatus updated for all users");
  } catch (error) {
    console.error("Error updating feeStatus:", error);
  }
});

// Example of renewing subscription for a specific user (you can call this function when the admin hits the renew button)
const userIdToRenew = "your_user_id_here";
renewSubscription(userIdToRenew);


module.exports = router;
