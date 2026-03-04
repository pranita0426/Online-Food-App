const mongoose = require('mongoose');

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      family: 4
    });
    console.log('🗄️  Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.warn('⚠️  Continuing without DB connection — some features will be disabled until MongoDB is available.');
    // Do not exit; keep server running for development. To fully enable DB features,
    // start a local mongod or set a valid DB_URI in backend/.env and restart the server.
  }
};

module.exports = databaseConnect;
