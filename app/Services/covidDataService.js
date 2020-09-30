"use strict";

const dummyRepo = require("../Repositories/dummyRepo.js");

async function covidDataService(dummyArg) {
  const data = '{ "name": "Flavio", "age": 35 }';
  try {
    const user = JSON.parse(data);
    console.log(user);
    console.log(typeof user);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  covidDataService: covidDataService,
};
