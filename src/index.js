require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const pino = require('pino-http')({
  // Use our default logger instance, which is already configured
  logger,
});

const port = parseInt(process.env.PORT);

const app = express();

app.use(pino);
app.use(helmet());
app.use(cors());

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`RSGC app listening at http://localhost:${port}`);
});

module.exports = app;
