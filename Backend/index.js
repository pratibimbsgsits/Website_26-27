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
      clientID:
        "438281789353-3vihhtpdhlucolrdv33te9r8l0r4hraq.apps.googleusercontent.com",
      clientSecret: "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",
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
        }

        const newUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        };

        const [savedUser] = await db("users").insert(newUser).returning("*");

        if (savedUser) {
          return done(null, savedUser);
        } else {
          return done(null, false, { message: "User registration failed" });
        }
      } catch (error) {
        console.error("Error during Google authentication", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db("users").where({ id }).first();
    if (user) {
      done(null, user); // User is found and attached to req.user
    } else {
      done(null, false, { message: "User not found" });
    }
  } catch (error) {
    done(error, null);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
