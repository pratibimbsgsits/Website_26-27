const express = require("express");
const session = require("express-session");
const db = require("./db/index.js");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const eventsRouter = require("./routes/events.routes.js");
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
const errorHandler = require("./utils/errorHandler.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

dotenv.config();

const app = express();

// Configure express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize passport after setting up session
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Use the routers
app.use(eventsRouter);
app.use(authRouter);

// Google OAuth Strategy Setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const existingUser = await db("users")
          .where({ email: profile.emails[0].value })
          .first();

        if (existingUser) {
          return done(null, existingUser);
        } else {
          // If user doesn't exist, insert new user
          const newUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          };

          const savedUser = await db("users").insert(newUser).returning("*");
          return done(null, savedUser);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Assuming 'id' is the unique identifier for the user
});

// Deserialize user information from the session
passport.deserializeUser(async (id, done) => {
  const user = await db("users").where({ id }).first();
  done(null, user);
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
