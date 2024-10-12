import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/User.js'; // Assuming your User model is an ES module
import jwt from 'jsonwebtoken';


passport.use(new GoogleStrategy({
    clientID: "438281789353-0sp0v5rmqvb54qvp63vl13os0m998hns.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:3000/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });

        if (existingUser) {
            // If user already exists, generate JWT and proceed
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
            done(null, { user: existingUser, token });
        } else {
            // Extract necessary information from the profile
            const enroll = profile.emails[0].value; // Assuming email contains enrollment
            let branch = enroll.slice(4, 6).toUpperCase();
            let batch = enroll.slice(6, 8);

            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                batch,
                branch,
                enrollment: enroll
            });

            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
            done(null, { user: savedUser, token });
        }
    } catch (error) {
        done(error, null);
    }
}));
passport.serializeUser((userData, done) => {
    done(null, userData);
});

passport.deserializeUser((userData, done) => {
    done(null, userData);
});
