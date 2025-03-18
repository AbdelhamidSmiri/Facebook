const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();

// connection to db
connectToDb();

// init app
const app = express();

// Middlewares
app.use(express.json());

app.use("/api/auth",require("./routes/authRoute"));

// Running the Server

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `server is running in : ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
