const express = require('express');
const router = express.Router();
const CarsController = require('../controllers/cars');
const UsersController = require('../controllers/users');

router
  .route('/users')
  .get(UsersController.usersList)
  .post(UsersController.usersCreate);

router
  .route('/users/:username')
  .get(UsersController.usersReadOne)
  .post(UsersController.usersReadOne)

router
  .route('/cars')
  .get(CarsController.carsListByDistance)  
  .post(CarsController.carsCreate);

router
  .route('/cars/:carid')
  .get(CarsController.carsReadOne)
  .put(CarsController.carsUpdateOne)
  .delete(CarsController.carsDeleteOne);

router
  .route('/register')
  .get(UsersController.usersCreate)
  .post(UsersController.usersCreate);

router
  .route('/login')
  .get(UsersController.usersLogin)
  .post(UsersController.usersLogin);

router
  .route('/logout')
  .get(UsersController.usersLogout)
  .post(UsersController.usersLogout);

module.exports = router;
