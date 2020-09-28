const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/summary", async (req, res) => {
  const summary = await fetch("https://api.covid19api.com/summary");

  try {
    let json = await summary.json();
    res.status(200).json(json.Countries);
  } catch (error) {
    console.log(`Controller error: ${error}`);
    return res.status(400);
  }
});

module.exports = router;
