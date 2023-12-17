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

//export { router as userRoute };
module.exports = router;
