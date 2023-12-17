const express = require("express");
const router = express.Router();
const User = require("../model/User.js");

//post Request for registering new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, age, address, phone, createdAt, feeStatus } =
      req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.json({
        error: "User already registered",
      });
    } else {
      const user = await User.create({
        userID,
        username,
        email,
        age,
        address,
        phone,
        createdAt,
        feeStatus,
      });
      res.json({ user }).status(200);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("User not Registered");
  }
});
// Define the route to get all registered users
app.get('/User', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the route to get a single registered user by ID
app.get('/User/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//export { router as userRoute };
module.exports = router;
