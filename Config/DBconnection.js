
const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const dbUrl = process.env.DB_LOCAL_URL;  // Access DB URL from environment variables
    if (!dbUrl) {
      throw new Error("DB_LOCAL_URL is not defined in your .env file");
    }

    await mongoose.connect(dbUrl, {
      
    });
    console.log("vanakkam",process.env.DB_LOCAL_URL);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

module.exports = connectDb;
