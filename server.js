'use strict';

const app = require('./app/routes.js');
const PORT = process.env.PORT || 8080;

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Works');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
