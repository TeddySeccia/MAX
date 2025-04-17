const multer = require("multer");
const path = require("path");

const mimeTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("milter 21 fieldname =", file.fieldname); // debug
    console.log("multer 22 req.body",req.body);
    console.log("multer 23 req.file",req.file);
    
    

    switch (file.fieldname) {
      case "documentAvatar":
        cb(null, "./uploads/documents");
        break;
      case "userAvatar":
        cb(null, "./uploads/users");
        break;
      case "iconeAvatar":
        cb(null, `./public/uploads/${req.body.iconeType}_icones`);
        break;
      default:
        cb(new Error("Type de champ fichier inconnu"), null);
    }
  },
  

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!mimeTypes.includes(file.mimetype)) {
      req.multerError = true;
      return cb(null, false);
    }
    cb(null, true);
  }
});

module.exports = upload;