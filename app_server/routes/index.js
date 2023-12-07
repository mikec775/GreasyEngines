const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main'); 
const ctrlOthers = require('../controllers/others');
const ctrlCars = require('../controllers/cars');
const ctrlUsers = require('../controllers/users');

router.get('/', ctrlMain.index);
router.get('/index', ctrlMain.index);

router.get('/login', ctrlUsers.login);
router.get('/register', ctrlUsers.register);
router.get('/createUser', ctrlUsers.createUser);


router.get('/cars', ctrlCars.cardata);
router.get('/cars/car', ctrlCars.carinfo);

module.exports = router;