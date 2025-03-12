const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const stateRoutes = require("./routes/stateRoutes");
const districtRoutes = require("./routes/districtRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/states", stateRoutes);
app.use("/api/districts", districtRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
