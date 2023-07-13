// const multer = require("multer");
// const path = require("path");

// const avatarsDir = path.join(__dirname, "../temp");

// const multerConfig = multer.diskStorage({
//   destination: avatarsDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// module.exports = upload;
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: 'dcoapyu3y',
  api_key: '216873626836426',
  api_secret: 'yGbu64OknlBLHw-HX5dqYZkVBys',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the folder based on file properties or request data
    let folder;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } else if (file.fieldname === 'documents') {
      folder = 'documents';
    } else {
      folder = 'misc';
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"], // Adjust the allowed formats as needed
      public_id: file.originalname, // Use original filename as the public ID
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700, crop: 'fill' },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;