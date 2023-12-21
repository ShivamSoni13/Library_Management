const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
//const bcryptjs = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;
const uri =
  "mongodb+srv://libmgmt:12345@libmgmt.cynijla.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully on -> " + uri);
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
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-default-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// Passport configuration
passport.use(
  new LocalStrategy((username, password, done) => {
    AuthUser.findOne({ username })
      .then((user) => {
        if (!user) return done(null, false, { message: "Incorrect username." });

        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (!result)
              return done(null, false, { message: "Incorrect password." });
            return done(null, user);
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  AuthUser.findById(id)
    .exec()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

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

app.post("/login", passport.authenticate("local"), async (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
});

// Check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

app.get("/profile", isAuthenticated, (req, res) => {
  res.json({ message: "Access to protected resource granted", user: req.user });
});

// User routes
app.use("/api", userRoute);

app.options("*", cors());
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
