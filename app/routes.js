'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const dummy = require('./Controllers/dummyController');

app.get('/', (req, res) => {
  res.send('Works');
});

app.use('/api/dummy', dummy);

module.exports = app;
