const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

//api routes go here
router.get('/testAuth', require('./testAuth'));
router.get('/userInfo', require('./getUserInfo'));
router.get('/reports', require('./getReports'));
router.get('/report/:id', require('./getReport'));
router.post('/report', upload.array('evidenceName'), require('./report'));
router.post('/', express.json(), require('./post'));

module.exports = router;
