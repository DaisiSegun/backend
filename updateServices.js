const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('./models/sp.model');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const updateServices = async () => {
  try {
    // Update services that don't have the priority field
    const result = await Service.updateMany(
      { sales: { $exists: true } },
      { $rename: { sales: 'priority' } }
    );

    console.log('All products updated successfully');
    console.log(result);
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    mongoose.disconnect();
  }
};

updateServices();
