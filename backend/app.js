const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// User Routes Api
const User_Route = require('./routes/UserRoutes.js')
app.use('/api/v1/', User_Route);


// Product Routes Api
const Product_Route = require('./routes/ProductRoutes')
app.use('/api/v1', Product_Route);

// Cart Routes Api
const Cart_Route = require('./routes/CartRoutes')
app.use('/api/v1', Cart_Route);

// Orders Routes Api
const Order_Route = require('./routes/OrderRoutes')
app.use('/api/v1', Order_Route);

// Rating Routes Api
const RatingRoute = require('./routes/RatingRoutes.js')
app.use('/api/v1', RatingRoute);

// Wishlist Routes Api
const WishlistRoute = require('./routes/WishlistRoutes.js')
app.use('/api/v1', WishlistRoute);

// Review Routes Api
const ReviewRoute = require('./routes/ReviewRoutes.js')
app.use('/api/v1', ReviewRoute);

// Payment Routes Api
const PaymentRoutes = require(("./routes/PaymentRoutes.js"));
app.use("/api/v1", PaymentRoutes);

// Restaurant Routes Api
const RestaurantRoutes = require('./routes/RestaurantRoutes');
app.use('/api/v1', RestaurantRoutes);
// Global error handler to return friendly messages for upload/file errors
app.use((err, req, res, next) => {
  if (!err) return next()
  console.error('Unhandled error:', err)

  // Multer file size limit
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File too large. Maximum allowed size is 5MB.' })
  }

  // Our custom invalid file type error
  if (err.code === 'INVALID_FILE_TYPE' || err.message === 'Invalid file type') {
    return res.status(400).json({ message: 'Invalid file type. Only JPG, PNG and WEBP images are allowed.' })
  }

  // Multer-specific errors
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message })
  }

  // Fallback
  return res.status(500).json({ message: 'Server error' })
})

module.exports = app;


