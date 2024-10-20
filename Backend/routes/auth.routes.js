const express = require("express");
const passport = require("passport");
const db = require("../db/index.js");
const errorHandler = require("../utils/errorHandler.js");

const router = express.Router();

// Route for entering enrollment number
router.post("/enter-enrollment", (req, res) => {
  const { enrollment } = req.body;

  if (!enrollment) {
    return res
      .status(400)
      .send(errorHandler(400, "Bad Request", "Enrollment number missing. Please enter the Enrollment Number."));
  }

  // Store enrollment number in session
  req.session.enrollment = enrollment;

  // Redirect to Google authentication
  res.redirect("/auth/google");
});

// Auth routes for Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), async (req, res) => {
  // After successful login, check for enrollment number in session
  const enrollment = req.session.enrollment;

  if (!enrollment) {
    return res.status(400).json({ success: false, message: "Enrollment number is missing." });
  }

  // Extract branch and batch from enrollment
  let branch = enrollment.slice(4, 6).toUpperCase();
  let batch = enrollment.slice(6, 8);

  // Update user details in PostgreSQL using Knex.js
  const updatedUser = await db("users")
    .where({ id: req.user.id }) // Assuming req.user contains the authenticated user
    .update({
      branch,
      batch,
      enrollment,
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
});

module.exports = router;
