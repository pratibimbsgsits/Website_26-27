const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const knex = require("./db"); // Your Knex setup
const passportSetup = require("./controllers/passport-conf");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Google Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"], // Scopes determine what user information is requested
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard"); // Redirect to a protected route after login
  }
);

// Check if user is authenticated
app.get("/login-check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("http://localhost:3000"); // Redirect to login page after logout
  });
});

// Update enrollment and batch (as before)
app.post("/update-details", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send("Not Authenticated");

  const { enrollment_number, batch } = req.body;
  try {
    await knex("users")
      .where({ id: req.user.id })
      .update({ enrollment_number, batch });
    res.send("Details updated");
  } catch (error) {
    res.status(500).send("Failed to update details");
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
