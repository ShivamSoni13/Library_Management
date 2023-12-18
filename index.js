process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);

});

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
const uri =
  'mongodb+srv://libmgmt:12345@libmgmt.cynijla.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully on -> ' + uri);
  })
  .catch((e) => {
    console.error('Error connecting to the database:', e.message);
  });

// Auth schema
const authSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const AuthUser = mongoose.model('AuthUser', authSchema);



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(
  new LocalStrategy((username, password, done) => {
    AuthUser.findOne({ username })
      .then((user) => {
        if (!user) return done(null, false, { message: 'Incorrect username.' });

        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (!result) return done(null, false, { message: 'Incorrect password.' });

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
  AuthUser.findById(id, (err, user) => {
    done(err, user);
  });
});

// Routes
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

// Check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

app.get('/profile', isAuthenticated, (req, res) => {
  res.json({ message: 'Access to protected resource granted', user: req.user });
});

// User routes
app.use('/api', userRoute);
 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
