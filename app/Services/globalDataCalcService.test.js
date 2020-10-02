const globalDataCalcService = require("../Services/globalDataCalcService");

describe("globalDataCalcService", () => {
  test("function calculates the sum of the population of all countries properly", () => {
    let globalData = {};

    const countries = [
      {
        CountryCode: "T1",
        Country: "Test1",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        Population: 100000000,
        Severity: "Low",
      },
      {
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        Population: 1000000,
        Severity: "High",
      },
    ];

    globalDataCalcService.globalDataCalcService(globalData, countries);

    expect(globalData.Population).toEqual(101000000);
  });

  test("if inpur object has Population property, if function called on it, the property is overridden with the correct number", () => {
    let globalData = { Population: 1 };

    const countries = [
      {
        CountryCode: "T1",
        Country: "Test1",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        Population: 100000000,
        Severity: "Low",
      },
      {
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        Population: 1000000,
        Severity: "High",
      },
    ];

    globalDataCalcService.globalDataCalcService(globalData, countries);

    expect(globalData.Population).toEqual(101000000);
  });

  test("if countries array is empty, globaldata remains unchanged", () => {
    let globalData = {};

    const countries = [];

    globalDataCalcService.globalDataCalcService(globalData, countries);

    expect(globalData.hasOwnProperty("Population")).toEqual(false);
  });
});
