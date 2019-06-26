'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carsSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  folder: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
