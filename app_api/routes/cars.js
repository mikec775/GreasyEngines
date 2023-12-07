const express = require('express');
const router = express.Router();
const CarsController = require('../controllers/cars');
const UsersController = require('../controllers/users');

router
  .route('/users')
  .get(UsersController.usersList)
  .post(UsersController.usersCreate);

router
  .route('/users/:userid')
  .get(UsersController.usersReadOne)
  .put(UsersController.usersUpdateOne)
  .delete(UsersController.usersDeleteOne);
  
router
  .route('/cars')
  .get(CarsController.carsListByDistance)  
  .post(CarsController.carsCreate);

router
  .route('/cars/:carid')
  .get(CarsController.carsReadOne)
  .put(CarsController.carsUpdateOne)
  .delete(CarsController.carsDeleteOne);

module.exports = router;
