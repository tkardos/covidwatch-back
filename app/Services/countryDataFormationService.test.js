const countryDataFormationServiceFunctions = require("./countryDataFormationService");

describe("calculateSeverityByPopulation", () => {
  test("sets severity to Low if active cases are less than 0,0001 percent", () => {
    const country = {
      TotalConfirmed: 100,
      TotalRecovered: 99,
      Population: 100000,
    };

    countryDataFormationServiceFunctions.calculateSeverityByPopulation(country);

    expect(country.Severity).toEqual("Low");
  });

  test("sets severity to Medium if active cases are less than 0,001 percent but more than 0,0001 percent", () => {
    const country = {
      TotalConfirmed: 100,
      TotalRecovered: 79,
      Population: 100000,
    };

    countryDataFormationServiceFunctions.calculateSeverityByPopulation(country);

    expect(country.Severity).toEqual("Medium");
  });

  test("sets severity to High if active cases are more than 0,001 percent", () => {
    const country = {
      TotalConfirmed: 111,
      TotalRecovered: 0,
      Population: 100000,
    };

    countryDataFormationServiceFunctions.calculateSeverityByPopulation(country);

    expect(country.Severity).toEqual("High");
  });
});
