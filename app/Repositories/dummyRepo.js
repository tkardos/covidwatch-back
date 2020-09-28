'use strict';

function dummyPromise(dummyArg) {
  let dummyVariable = '';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dummyVariable = dummyArg
      return resolve(dummyVariable);
    }, 1000);
  });
}


module.exports = {
  dummyPromise: dummyPromise
};
