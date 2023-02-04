const express = require('express');
const bodyParser = require('body-parser');
const { hostname } = require('os');
const { version, author } = require('../../package.json');
const { auth } = require('../auth');

const router = express.Router();

router.use(`/api`, auth(), require('./api'));

//first health check route to see that everything's working alright
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');

  const body = {
    status: 'ok',
    authors: author,
    version: version,
    hostname: hostname(),
  };

  res.status(200).json({ ...body });
});

router.post('/', bodyParser.json(), (req, res) => {
  try {
    res.status(201).json({ status: 'ok' });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
