"use strict";

//puts the population data as a property to each country and returns an array of objects

async function countryDataFormationService(cases, population) {
  try {
    let casesWOPopulation = transformDataByCountryCode(cases);

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
    console.error(err);
  }
}

//creates an object where the properties are country codes and the value of it is an object with the different covid realted info for that country.

const transformDataByCountryCode = (cases) => {
  let casesByCountryCode = {};

  cases.forEach((country) => {
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
  });

  return casesByCountryCode;
};

const calculateSeverityByPopulation = (country) => {
  const activeCases = country.TotalConfirmed - country.TotalRecovered;

  const ratio = activeCases / country.Population;
  console.log(ratio);

  if (ratio < 0.0001) {
    country.Severity = "Low";
  } else if (0.0001 <= ratio && ratio < 0.001) {
    country.Severity = "Medium";
  } else {
    country.Severity = "High";
  }
};

module.exports = {
  countryDataFormationService,
  transformDataByCountryCode,
  calculateSeverityByPopulation,
};
