const express = require('express');
const router = express.Router();
const ctrlCars = require('../controllers/cars');

// car
router
  .route('/cars')
  .get(ctrlCars.carsListByDistance)
  .post(ctrlCars.carsCreate);


router
  .route('/cars/:carid')
  .get(ctrlCars.carsReadOne)
  .put(ctrlCars.carsUpdateOne)
  .delete(ctrlCars.carsDeleteOne);

module.exports = router;