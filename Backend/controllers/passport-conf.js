const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const knex = require("../db/index");
const responseHandler = require("../utils/responseHandler");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "438281789353-0sp0v5rmqvb54qvp63vl13os0m998hns.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await knex("users")
          .where({ google_id: profile.id })
          .first();
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await knex("users")
          .insert({
            google_id: profile.id,
            enrollment_number: " ",
            batch: " ",
          })
          .returning("*");
        if (newUser) {
          done(null, newUser[0]);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await knex("users").where({ id }).first();
  done(null, user);
});
