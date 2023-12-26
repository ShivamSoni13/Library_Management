const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully ");
  })
  .catch((e) => {
    console.error("Error connecting to the database:", e.message);
    process.exit(1);
  });

// Auth schema
const authSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

const AuthUser = mongoose.model("AuthUser", authSchema);

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "your-default-secret-key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(bodyParser.json());

// Configure the JWT secret key
const jwtSecret = process.env.JWT_SECRET;

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
/*
// Check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    return next();
  });
};

app.get("/profile", isAuthenticated, (req, res) => {
  res.json({ message: "Access to protected resource granted", user: req.user });
});
*/
// User routes
app.use("/api", userRoute);

// Deployment Code 

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){

  app.use(express.static(path.join(__dirname1, "../client/my-project/dist")));

  app.get('*', (req,res)=> {
    res.sendFile(path.resolve(__dirname1, "../client/my-project/dist/index.html"));
  });

}else {
  app.get("/", (req,res) => {
    res.send("API is Running Successfully")
  });

}

// Deployment Code

app.options("*", cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running`);
});
