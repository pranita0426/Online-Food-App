const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/Authenticate');
const admin = require('../middleware/Admin');
const RestaurantController = require('../controllers/RestaurantController');

// admin-only create
router.post('/restaurant', authenticate, admin('ADMIN'), RestaurantController.createRestaurant);
// public list
router.get('/restaurants', RestaurantController.getAllRestaurants);

module.exports = router;
