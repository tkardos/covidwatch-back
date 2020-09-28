"use strict";

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const covidData = require("./Controllers/covidDataController");

app.get("/", (req, res) => {
  res.send("Works");
});

app.use("/api", covidData);

module.exports = app;
