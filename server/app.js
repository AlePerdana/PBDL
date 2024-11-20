const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoute");
require("dotenv").config();
const task = require("./models/task");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/todos", todoRoutes);

// MongoDB connection
const mongoURL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/PBDLPA";
mongoose
  .connect(mongoURL, {
    tls: true,
    tlsInsecure: true, // Disable in production
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
