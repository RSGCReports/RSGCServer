const express = require('express');
const router = express.Router();

//api routes go here
router.get('/testAuth', require('./testAuth'));
router.post('/', express.json(), require('./post'));

module.exports = router;
