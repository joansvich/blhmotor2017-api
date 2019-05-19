const express = require('express');
const router = express.Router();

const Cars = require('../models/Cars');

router.get('/', (req, res, next) => {
  Cars.find()
    .then((cars) => {
      return res.json(cars);
    });
});

router.post('/create', (req, res, next) => {
  const { model, image, price } = req.body;

  Cars.findOne({
    model
  }, 'model')
    .then((carExists) => {
      if (carExists) {
        const err = new Error('Car exists');
        err.status = 422;
        err.statusMessage = 'cars-name-not-unique';
        next(err);
      }

      const newCar = new Cars({
        model,
        image,
        price
      });

      return newCar.save().then(() => {
        res.status(200).json(newCar);
      });
    })
    .catch(next);
});

module.exports = router;
