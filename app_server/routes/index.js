const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/main'); 
const ctrlOthers = require('../controllers/others');
const ctrlCars = require('../controllers/cars');

router.get('/', ctrlLocations.index);
router.get('/index', ctrlLocations.index);


router.get('/login', ctrlOthers.login);
router.get('/createUser', ctrlOthers.createUser);

router.get('/cars', ctrlCars.cardata);
router.get('/cars/car', ctrlCars.carinfo);

module.exports = router;