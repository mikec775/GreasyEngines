const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/main'); 
const ctrlOthers = require('../controllers/others');

router.get('/', ctrlLocations.index);
router.get('/index', ctrlLocations.index);
//router.get('/location', ctrlLocations.locationInfo);
//router.get('/location/review/new', ctrlLocations.addReview);
/* Other pages */

router.get('/login', ctrlOthers.login);
router.get('/createUser', ctrlOthers.createUser);
module.exports = router;
module.exports = router;


