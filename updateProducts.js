const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/product.model');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const updateProducts = async () => {
  try {
    const result = await Product.updateMany(
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
updateProducts();
