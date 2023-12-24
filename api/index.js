const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const uri = process.env.URI;
const jwtSecret = process.env.JWT_SECRET;
const corsOrigin = process.env.CORS_ORIGIN;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully on -> " + uri);
  })
  .catch((e) => {
    console.error("Error connecting to the database:", e.message);
    process.exit(1);
  });

const authSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const AuthUser = mongoose.model("AuthUser", authSchema);

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.post("/register", async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await AuthUser.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new AuthUser({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Authenticate the user
    const user = await AuthUser.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    // Set the session timeout
    const sessionTimeout = 10; // 10 seconds

    // Generate JWT token with expiration time
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + sessionTimeout,
      },
      jwtSecret
    );

    // Store the flag in local storage
    res.json({ user, isLoggedIn: true });
    // .json({ message: "Login successful", token, isLoggedIn: true });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// User routes
app.use("/api", userRoute);

app.options("*", cors());

// Accessing Static Files
app.use(express.static(path.join(__dirname, '../client/my-project/dist')));

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, '../client/my-project/dist/index.js'))
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
