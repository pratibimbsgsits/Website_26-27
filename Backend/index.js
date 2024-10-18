import express from "express";
import session from "express-session";
import db from "./db/index.js";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); // Parse JSON bodies

// Google OAuth Strategy Setup
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "438281789353-2nnhm6dnuafb1mq7oosfmm46m3e9ornp.apps.googleusercontent.com",
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
        } else {
          // If user doesn't exist, insert new user
          const newUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          };
        }

        const [savedUser] = await db("users").insert(newUser).returning("*");

        done(null, savedUser);
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

// Route for entering enrollment number
app.post("/enter-enrollment", (req, res) => {
  const { enrollment } = req.body;

  if (!enrollment) {
    return res
      .status(400)
      .json({ success: false, message: "Enrollment number is required." });
  }

  // Store enrollment number in session
  req.session.enrollment = enrollment;

  // Redirect to Google authentication
  res.redirect("/auth/google");
});

// Auth routes for Google OAuth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    // After successful login, check for enrollment number in session
    const enrollment = req.session.enrollment;

    if (!enrollment) {
      return res
        .status(400)
        .json({ success: false, message: "Enrollment number is missing." });
    }

    // Extract branch and batch from enrollment
    let branch = enrollment.slice(4, 6).toUpperCase();
    let batch = enrollment.slice(6, 8);

    // Update user details in PostgreSQL using Knex.js
    const updatedUser = await db("users")
      .where({ id: req.user.id }) // Assuming req.user contains the authenticated user
      .update({
        branch: branch,
        batch: batch,
        enrollment_number: enrollment,
      })
      .returning("*"); // Return the updated user

    // Clear the enrollment from session
    delete req.session.enrollment;

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Error occurred while updating user data",
      });
    }

    // Redirect to complete registration after successful OAuth login
    res.redirect("http://localhost:5173/complete-registration");
  }
);
// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
