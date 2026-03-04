const RestaurantService = require('../services/RestaurantService');

const createRestaurant = async (req, res) => {
  try {
    const data = req.body;
    const restaurant = await RestaurantService.createRestaurant(data);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const list = await RestaurantService.getAllRestaurants();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRestaurant, getAllRestaurants };