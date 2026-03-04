const Restaurant = require('../models/Restaurant');

const createRestaurant = async (data) => {
  const existing = await Restaurant.findOne({ name: data.name });
  if (existing) throw new Error('Restaurant already exists');
  const restaurant = await Restaurant.create(data);
  return restaurant;
};

const getAllRestaurants = async () => {
  return await Restaurant.find();
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
};