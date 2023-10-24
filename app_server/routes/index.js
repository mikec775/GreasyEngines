const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main'); 
const ctrlOthers = require('../controllers/others');
const ctrlCars = require('../controllers/cars');

router.get('/', ctrlMain.index);
router.get('/index', ctrlMain.index);


router.get('/login', ctrlOthers.login);
router.get('/createUser', ctrlOthers.createUser);

router.get('/cars', ctrlCars.cardata);
router.get('/cars/car', ctrlCars.carinfo);

module.exports = router;