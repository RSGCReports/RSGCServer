const express = require('express');
const router = express.Router();

//api routes go here
router.get('/testAuth', require('./testAuth'));

module.exports = router;
