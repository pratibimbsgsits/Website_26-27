const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const knex = require("../db/index");
require("dotenv");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
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
