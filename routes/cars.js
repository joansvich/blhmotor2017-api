const express = require('express');
const router = express.Router();

const Cars = require('../models/Cars');
const parser = require('../config/cloudinary');

router.get('/', (req, res, next) => {
  Cars.find()
    .then((cars) => {
      return res.json(cars);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Cars.findById(id)
    .then((cars) => {
      return res.json(cars);
    });
});

router.post('/create', (req, res, next) => {
  const { model, imageUrl, price, folder } = req.body;

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
        imageUrl,
        price,
        folder
      });

      return newCar.save().then(() => {
        res.status(200).json(newCar);
      });
    })
    .catch(next);
});

router.post('/image', parser.single('photo'), (req, res, next) => {
  console.log('file upload');
  if (!req.file) {
    next(new Error('No file uploaded!'));
  };
  const imageUrl = req.file.secure_url;
  res.json(imageUrl).status(200);
});

router.post('/gallery', parser.array('photo', 8), (req, res, next) => {
  console.log('gallery upload');
  if (!req.file) {
    next(new Error('No file uploaded!'));
  };
  console.log(req.file);
  const galleryUrl = req.file.secure_url;
  res.json(galleryUrl).status(200);
});

module.exports = router;
