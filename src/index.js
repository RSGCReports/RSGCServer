require('dotenv').config();
const express = require('express');
const passport = require('passport');
const auth = require('./auth');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const pino = require('pino-http')({
  logger,
});
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const port = parseInt(process.env.PORT);

const app = express();

app.use(pino);
app.use(helmet());
app.use(cors());
passport.use(auth.strategy());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
// for parsing multipart/form-data
// app.use(upload.array());
app.use(express.static('uploads'));

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`RSGC app listening at http://localhost:${port}`);
});

module.exports = app;
