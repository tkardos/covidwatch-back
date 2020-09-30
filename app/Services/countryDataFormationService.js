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

module.exports = {
  countryDataFormationService: countryDataFormationService,
};
