const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();
// const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
cloudinary.config({
  cloud_name: "dcoapyu3y",
  api_key: "216873626836426",
  api_secret: "yGbu64OknlBLHw-HX5dqYZkVBys",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === "avatar") {
      folder = "avatars";
    } else if (file.fieldname === "documents") {
      folder = "documents";
    } else {
      folder = "misc";
    }
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      public_id: file.originalname,
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700, crop: "fill" },
      ],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
