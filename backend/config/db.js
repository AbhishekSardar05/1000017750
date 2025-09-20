const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://abhisheksardar127_db_user:Z2aOwwOc14qxPvUZ@cluster0.soh05kl.mongodb.net/urlshortener', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    
    // Provide helpful error message
    if (error.code === 'ECONNREFUSED') {
      console.log('\n⚠️  MongoDB is not running. Please:');
      console.log('1. Install MongoDB locally, OR');
      console.log('2. Use MongoDB Atlas (cloud), OR');
      console.log('3. Start MongoDB service if already installed');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;