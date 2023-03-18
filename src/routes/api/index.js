const express = require('express');
const router = express.Router();

//api routes go here
router.get('/testAuth', require('./testAuth'));
router.get('/userInfo', require('./getUserInfo'));
router.post('/report', express.json(), require('./report'));
router.post('/', express.json(), require('./post'));

module.exports = router;
