const express = require("express");
const passport = require("passport");
const db = require("./db/index.js");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());


app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
  