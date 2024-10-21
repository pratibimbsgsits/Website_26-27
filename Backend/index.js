const express = require("express");
const session = require("express-session");
const db = require("./db/index.js");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const eventsRouter = require("./routes/events.routes.js");
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
const errorHandler = require("./utils/errorHandler.js");


dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


// Use the routers
app.use(eventsRouter);
app.use(authRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const success = false;
  return res.status(statusCode).json({
    success ,
    statusCode,
    message,
  })
})
