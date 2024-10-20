const express = require("express");
const passport = require("passport");
const db = require("../db/index.js");
const errorHandler = require("../utils/errorHandler.js");

const router = express.Router();

router.post("/enter-enrollment", (req, res) => {
  const { enrollment } = req.body;

  if (!enrollment) {
    return res
      .status(400)
      .send(
        errorHandler(
          400,
          "Bad Request",
          "Enrollment number missing. Please enter the Enrollment Number."
        )
      );
  }

  req.session.enrollment = enrollment;

  res.redirect("/auth/google");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    const enrollment = "0801ME231041";

    if (!enrollment) {
      return res
        .status(400)
        .json({ success: false, message: "Enrollment number is missing." });
    }

    let branch = enrollment.slice(4, 6).toUpperCase();
    let batch = enrollment.slice(6, 8);

    const updatedUser = await db("users")
      .where({ id: req.user.id })
      .update({
        branch,
        batch,
        enrollment,
      })
      .returning("*");

    delete req.session.enrollment;

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "Error occurred while updating user data",
      });
    }

    res.redirect("http://localhost:5173/home");
  }
);

module.exports = router;
