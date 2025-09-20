const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    
    // Provide helpful error message
    if (error.code === 'ECONNREFUSED') {
      console.log('\n  MongoDB is not running. Please:');
      console.log('1. Install MongoDB locally, OR');
      console.log('2. Use MongoDB Atlas (cloud), OR');
      console.log('3. Start MongoDB service if already installed');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
