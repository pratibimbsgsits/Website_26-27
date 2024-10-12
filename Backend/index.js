import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "438281789353-0sp0v5rmqvb54qvp63vl13os0m998hns.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {}
  )
);

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const enrollment = req.query.enrollment.query;
    if (req.user.enrollment != enrollment) {
      return res
        .status(400)
        .send(
          errorHandler(400, "Inavlid Request", "Enrollment Number Mismatched")
        );
    }
    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).json(req.user); // Send back user data excluding sensitive information
    res.redirect("/home");
  }
);

app.listen(3000, () => {
  console.log("server is running on port 3000!");
});
