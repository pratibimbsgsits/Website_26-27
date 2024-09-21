const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const knex = require('./db'); // Your Knex setup
const passportSetup = require('./controllers/passport-conf');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow React frontend
app.use(express.json());
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile'],
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect('http://localhost:5173/update-details');
});

app.post('/update-details', async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Not Authenticated');

  const { enrollment_number, batch } = req.body;
  try {
    await knex('users')
      .where({ id: req.user.id })
      .update({ enrollment_number, batch });
    res.send('Details updated');
  } catch (error) {
    res.status(500).send('Failed to update details');
  }
});

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
