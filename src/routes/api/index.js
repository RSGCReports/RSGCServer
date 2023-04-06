const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

//api routes go here
router.get('/testAuth', require('./testAuth'));
router.get('/userInfo', require('./getUserInfo'));
router.get('/reports', require('./getReports'));
router.get('/getPolicies', require('./getPolicies'));
router.get('/report/:id', require('./getReport'));
router.put('/updatePolicy', express.json(), require('./updatePolicy'));
router.put('/updatePersonal', express.json(), require('./updatePersonal'));
router.put('/updateVehicle', express.json(), require('./updateVehicle'));
router.post('/postPolicy', express.json(), require('./postPolicy'));
router.post('/postVehicle', express.json(), require('./postVehicle'));
router.post('/postFeedback', express.json(), require('./postFeedback'));
router.post('/report', upload.array('evidenceName'), require('./report'));
router.post('/', express.json(), require('./post'));

module.exports = router;
