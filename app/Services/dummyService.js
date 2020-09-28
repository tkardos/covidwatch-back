'use strict';

const dummyRepo = require('../Repositories/dummyRepo.js');

async function dummyService(dummyArg) {
  try {
    const result = await dummyRepo.dummyPromise(dummyArg);
    return result;
  } catch (error) {
    console.log(`Service error: ${error}`);
  }
}

module.exports = {
  dummyService: dummyService
};
