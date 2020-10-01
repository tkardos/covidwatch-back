"use strict";

async function globalDataCalcService(globalData, countries) {
  if (countries.length > 0) {
    let globalPopulation = 0;

    countries.forEach((country) => {
      globalPopulation += country.Population;
    });

    globalData.Population = globalPopulation;
  }

  return globalData;
}

module.exports = {
  globalDataCalcService: globalDataCalcService,
};
