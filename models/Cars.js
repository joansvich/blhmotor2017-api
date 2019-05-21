'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carsSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: {
    type: Array
  },
  price: {
    type: String,
    required: true
  }
});

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
