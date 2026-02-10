const multer = require("multer");
const fs = require("fs");
const path = require("path");

// PWD
const PWD = process.cwd();
console.log("PWD:", PWD);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedFormats = [".jpeg", ".jpg", ".png"];
  const fileExt = path.extname(file.originalname).toLowerCase();

  console.log("File extension:", fileExt);

  if (!allowedFormats.includes(fileExt)) {
    return cb(new Error("Only JPG, JPEG, PNG files are allowed"), false);
  }

  cb(null, true);
}

module.exports = fileFilter;

const upload = multer({ storage, fileFilter });

module.exports = upload;
