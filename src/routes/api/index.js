const express = require('express');
const router = express.Router();
const multer = require('multer');

const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + 'Evidence' + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });
const upload = multer();

//api routes go here
router.get('/testAuth', require('./testAuth'));
router.get('/userInfo', require('./getUserInfo'));
router.post('/report', upload.array('evidenceName'), require('./report'));
router.post('/', express.json(), require('./post'));

module.exports = router;
