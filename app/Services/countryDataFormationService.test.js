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

  test("If input has no >>TotalConfirmed<< property, it throws an error", () => {
    const country = {
      TotalRecovered: 0,
      Population: 100000,
    };
    expect(() => {
      countryDataFormationServiceFunctions.calculateSeverityByPopulation(
        country
      );
    }).toThrow(new Error("Insufficient data provided to do calculations"));
  });

  test("If input has no >>TotalRecovered<< property, it throws an error", () => {
    const country = {
      TotalConfirmed: 0,
      Population: 100000,
    };
    expect(() => {
      countryDataFormationServiceFunctions.calculateSeverityByPopulation(
        country
      );
    }).toThrow(new Error("Insufficient data provided to do calculations"));
  });

  test("If input has no >>Population<< property, it throws an error", () => {
    const country = {
      TotalConfirmed: 111,
      TotalRecovered: 0,
    };
    expect(() => {
      countryDataFormationServiceFunctions.calculateSeverityByPopulation(
        country
      );
    }).toThrow(new Error("Insufficient data provided to do calculations"));
  });
});

describe("transformDataByCountryCode", () => {
  test("If one element in the input array has no >>CountryCode<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
      },
      {
        //CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has no >>Country<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
      },
      {
        CountryCode: "T2",
        //Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has no >>NewConfirmed<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
      },
      {
        CountryCode: "T2",
        Country: "Test2",
        //NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has no >>TotalConfirmed<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
      },
      {
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        //TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has no >>NewDeaths<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
      },
      {
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        //NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has no >>TotalDeaths<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
      },
      {
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        //TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has no >>NewRecovered<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
      },
      {
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        //NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has no >>TotalRecovererd<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
      },
      {
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        //TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has no >>Date<< property, it throws an error", () => {
    cases = [
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
        ExtraProp: "ExtraProp",
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
        //Date: "2020-10-01T07:56:05Z",
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).toThrow(new Error("Field doesn't exist"));
  });

  test("If input array is empty, it throws an error", () => {
    cases = [];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).not.toThrow(new Error("Field doesn't exist"));
  });

  test("If one element in the input array has all required property, it does NOT throw an error", () => {
    cases = [
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
        //ExtraProp: "ExtraProp",
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
        ExtraProp: "ExtraProp",
      },
    ];
    expect(() => {
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases);
    }).not.toThrow(new Error("Field doesn't exist"));
  });

  test("function transforms an array of objects into desired object", () => {
    const cases = [
      {
        ExtraProp1: "ExtraProp",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        ExtraProp2: "ExtraProp",
        CountryCode: "T1",
        Country: "Test1",
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp3: "ExtraProp",
      },
      {
        ExtraProp1: "ExtraProp",
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        ExtraProp2: "ExtraProp",
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp3: "ExtraProp",
      },
    ];

    const result = {
      T1: {
        CountryCode: "T1",
        Country: "Test1",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
      },
      T2: {
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
      },
    };

    expect(
      countryDataFormationServiceFunctions.transformDataByCountryCode(cases)
    ).toEqual(result);
  });
});

describe("countryDataFormationService", () => {
  test("function returns the desired output", async () => {
    const cases = [
      {
        ExtraProp1: "ExtraProp",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        TotalDeaths: 100,
        NewRecovered: 1000,
        ExtraProp2: "ExtraProp",
        CountryCode: "T1",
        Country: "Test1",
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp3: "ExtraProp",
      },
      {
        ExtraProp1: "ExtraProp",
        CountryCode: "T2",
        Country: "Test2",
        NewConfirmed: 100,
        TotalConfirmed: 10000,
        NewDeaths: 10,
        ExtraProp2: "ExtraProp",
        TotalDeaths: 100,
        NewRecovered: 1000,
        TotalRecovered: 1000,
        Date: "2020-10-01T07:56:05Z",
        ExtraProp3: "ExtraProp",
      },
    ];

    const population = [
      { alpha2Code: "T1", population: 100000000 },
      { alpha2Code: "T2", population: 1000000 },
    ];

    const result = [
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

    const received = await countryDataFormationServiceFunctions.countryDataFormationService(
      cases,
      population
    );

    expect(received).toEqual(result);
  });
});
