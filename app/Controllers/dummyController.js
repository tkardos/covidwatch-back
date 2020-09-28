const express = require('express');
const router = express.Router();
const service = require('../Services/dummyService.js');

router.get('/', async (req, res) => {
  const dummyObject = {'to test': '/?key=value',...req.query}

    try {
        const dummyVariable = await service.dummyService(dummyObject);
        res.status(200).json(dummyVariable);
    } catch (error) {
        console.log(`Controller error: ${error}`);
        return res.status(400);
    }
});

module.exports = router;
