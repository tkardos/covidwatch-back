const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const countryDataFormationService = require("../Services/countryDataFormationService");
const globalDataCalcService = require("../Services/globalDataCalcService");
const cache = require("../Middlewares/memoryCache");

router.get("/summary", cache(600), async (req, res) => {
  const countriesCovid = await fetch("https://api.covid19api.com/summary");
  const countriesPopulation = await fetch(
    "https://restcountries.eu/rest/v2/all"
  );
  try {
    const covidDataRaw = await countriesCovid.json();
    const populationRaw = await countriesPopulation.json();

    const countryData = await countryDataFormationService.countryDataFormationService(
      covidDataRaw.Countries,
      populationRaw
    );

    const globalData = await globalDataCalcService.globalDataCalcService(
      covidDataRaw.Global,
      countryData
    );

    const data = {
      Global: globalData,
      Countries: countryData,
    };

    res.status(200).json(data);
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
