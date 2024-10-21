const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const eventsRouter = require("./routes/events.routes.js");
const authRouter = require("./routes/auth.routes.js");



dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


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
