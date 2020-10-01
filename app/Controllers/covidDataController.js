const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const countryDataFormationService = require("../Services/countryDataFormationService");
const globalDataCalcService = require("../Services/globalDataCalcService");
const LEDCalcService = require("../Services/LEDCalcService");
const cache = require("../Middlewares/memoryCache");

router.get("/summary", cache(600), async (req, res) => {

  //handle cases what happens if the api is down
  try {
    const countriesCovid = await fetch("https://api.covid19api.com/summary");
    const countriesPopulation = await fetch(
      "https://restcountries.eu/rest/v2/all"
    );

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
    console.log(`Controller error: ${error.message}`);
    return res.status(400);
  }
});

router.post("/country", async (req, res) => {
  let recovered=req.body.recovered;
  let confirmed=req.body.confirmed;
  let deaths=req.body.deaths;

  if(recovered==null || confirmed==null || deaths==null || isNaN(recovered) ||
      isNaN(confirmed) || isNaN(deaths) || !Number.isInteger(recovered) ||
      !Number.isInteger(confirmed) || !Number.isInteger(deaths)){
    return res.status(400).json({"error": "Some of the input fields are invalid!"});
  }

  try {
    const data = await LEDCalcService.LEDCalcService(
        recovered,
        confirmed,
        deaths
    );

    let response = await fetch("http://backend.bassboost.hu/hackathon/send/" +
        "711fdedf-a013-41de-9b07-b30314e3258c", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({configText: data})
    });

    setTimeout( async function(){
      await fetch("http://backend.bassboost.hu/hackathon/stop/" +
         "711fdedf-a013-41de-9b07-b30314e3258c", {
       method: 'POST'
      });
    },10000);

    setTimeout( function(){
      res.status(response.status).json({message: response.statusText});
    },15000);

  } catch (error) {
    console.log(`Controller error: ${error}`);
    return res.status(400);
  }
});

module.exports = router;
