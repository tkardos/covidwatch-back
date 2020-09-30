const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const covidDataService = require("../Services/covidDataService");
const cache = require("../Middlewares/memoryCache");

router.get("/summary", cache(10), async (req, res) => {
  const summary = await fetch("https://api.covid19api.com/summary");

  try {
    let json = await summary.json();
    res.status(200).json(json.Countries);
    covidDataService.covidDataService();
  } catch (error) {
    console.log(`Controller error: ${error}`);
    return res.status(400);
  }
});

router.get("/summary/country/:countryName", async (req, res) => {
  const summary = await fetch("https://api.covid19api.com/summary");

  try {
    let json = await summary.json();
    res.status(200).json(json.Countries);
    covidDataService.covidDataService();
  } catch (error) {
    console.log(`Controller error: ${error}`);
    return res.status(400);
  }
});

module.exports = router;
