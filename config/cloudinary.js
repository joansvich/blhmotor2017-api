const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dyzr3ysld',
  api_key: '415435717929929',
  api_secret: 'reZynoxwSuiT-hKRLHv9icfi8xQ'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'cars',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, 'my-file-name');
  }
});

const parser = multer({ storage: storage });

module.exports = parser;
