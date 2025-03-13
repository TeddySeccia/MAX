const multer = require("multer")
const mimeType = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/svg+xml',
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    
];



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.body.userMail) {
            cb(null, './uploads/users')
        }
        if (req.body.idDocument) {//A changer quand front dispo en req.session.idUser
            cb(null, './uploads/documents')
        }
        if (req.body.iconeType) {
            cb(null, `./public/uploads/${req.body.iconeType}_icones`);
        }
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1]
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension)
    }
})

const upload = multer({
    storage: storage,

    fileFilter: function (req, file, cb) {

        if (!mimeType.includes(file.mimetype)) {
            req.multerError = true;
            return cb(null, false);
        }
        cb(null, true);
    }
})

module.exports = upload