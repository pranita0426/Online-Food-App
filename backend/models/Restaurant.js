const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  image: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const Restaurant = mongoose.model('restaurants', restaurantSchema);
module.exports = Restaurant;
