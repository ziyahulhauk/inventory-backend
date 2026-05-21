import multer from "multer";

import {
  CloudinaryStorage,
} from "multer-storage-cloudinary";

import cloudinary
from "../config/cloudinary.js";

/* STORAGE */

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (
      req,
      file
    ) => ({

      folder:
        "inventory-system",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      transformation: [

        {
          width: 1000,
          height: 1000,
          crop: "limit",
        },

        {
          quality: "auto",
        },
      ],
    }),
  });

/* FILE FILTER */

const fileFilter =
  (req, file, cb) => {

    const allowed =
      [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];

    if (
      allowed.includes(
        file.mimetype
      )
    ) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Only images allowed"
        ),
        false
      );
    }
  };

/* MULTER */

const upload = multer({

  storage,

  limits: {

    fileSize:
      5 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;