const { response } = require("express");
const mcache = require("memory-cache");
const { __esModule } = require("node-fetch");

const cache = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheBody = mcache.get(key);

    if (cacheBody) {
      res.json(cacheBody);
      return;
    } else {
      res.sendResponse = res.json;
      res.json = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };

      next();
    }
  };
};

module.exports = cache;
