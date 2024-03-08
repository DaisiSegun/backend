const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user.model');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const updateUsers = async () => {
  try {
    // Update users that don't have totalStars and starNumber fields
    const result = await User.updateMany(
      { $or: [{ totalStars: { $exists: false } }, { starNumber: { $exists: false } }] },
      { $set: { totalStars: 0, starNumber: 0 } }
    );

    console.log('All users updated successfully');
    console.log(result);
  } catch (error) {
    console.error('Error updating users:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

updateUsers();
