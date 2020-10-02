"use strict";

//puts the population data as a property to each country and returns an array of objects

async function countryDataFormationService(cases, population) {
  try {
    const casesWOPopulation = transformDataByCountryCode(cases);
    let casesWithPopulation = [];

    population.forEach((element) => {
      if (casesWOPopulation.hasOwnProperty(element.alpha2Code)) {
        let country = casesWOPopulation[element.alpha2Code];
        country.Population = element.population;
        calculateSeverityByPopulation(country);
        casesWithPopulation.push(country);
      }
    });

    return casesWithPopulation;
  } catch (err) {
    console.error(err.message);
  }
}

//creates an object where the properties are country codes and the value of it is an object with the different covid realted info for that country.

const transformDataByCountryCode = (cases) => {
  let casesByCountryCode = {};

  cases.forEach((country) => {
    if (
      !country.hasOwnProperty("CountryCode") ||
      !country.hasOwnProperty("Country") ||
      !country.hasOwnProperty("NewConfirmed") ||
      !country.hasOwnProperty("TotalConfirmed") ||
      !country.hasOwnProperty("NewDeaths") ||
      !country.hasOwnProperty("TotalDeaths") ||
      !country.hasOwnProperty("TotalRecovered") ||
      !country.hasOwnProperty("NewRecovered") ||
      !country.hasOwnProperty("Date")
    ) {
      throw new Error("Field doesn't exist");
    } else {
      casesByCountryCode[country.CountryCode] = {
        CountryCode: country.CountryCode,
        Country: country.Country,
        NewConfirmed: country.NewConfirmed,
        TotalConfirmed: country.TotalConfirmed,
        NewDeaths: country.NewDeaths,
        TotalDeaths: country.TotalDeaths,
        NewRecovered: country.NewRecovered,
        TotalRecovered: country.TotalRecovered,
        Date: country.Date,
      };
    }
  });

  return casesByCountryCode;
};
const calculateSeverityByPopulation = (country) => {
  if (
    !country.hasOwnProperty("TotalConfirmed") ||
    !country.hasOwnProperty("TotalRecovered") ||
    !country.hasOwnProperty("Population")
  ) {
    throw new Error("Insufficient data provided to do calculations");
  } else {
    const activeCases = country.TotalConfirmed - country.TotalRecovered;

    const ratio = activeCases / country.Population;

    if (ratio < 0.0001) {
      country.Severity = "Low";
    } else if (0.0001 <= ratio && ratio < 0.001) {
      country.Severity = "Medium";
    } else {
      country.Severity = "High";
    }
  }
};

module.exports = {
  countryDataFormationService,
  transformDataByCountryCode,
  calculateSeverityByPopulation,
};
