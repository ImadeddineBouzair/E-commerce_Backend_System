const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required!'],
      unique: true,
      trim: true,
    },

    categorie: {
      type: String,
      required: [true, 'Product categorie is required!'],
      enum: [
        'cpu',
        'gpu',
        'ram',
        'storage',
        'case',
        'psu',
        'keyboard',
        'mouse',
        'printer',
        'webcam',
        'fan',
      ],
    },

    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },

    quantity: {
      type: Number,
      default: null,
    },

    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;
