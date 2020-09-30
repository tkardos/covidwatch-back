"use strict";

async function globalDataCalcService(globalData, countries) {
  try {
    let globalPopulation = 0;

    countries.forEach((country) => {
      globalPopulation += country.Population;
    });

    globalData.Population = globalPopulation;

    return globalData;
  } catch (error) {
    console.log(`Service error: ${error}`);
  }
}

module.exports = {
  globalDataCalcService: globalDataCalcService,
};
