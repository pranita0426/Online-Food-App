
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']

const productsStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const usersStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'users',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

// Reusable file filter that restricts to image MIME types
const imageFileFilter = (req, file, cb) => {
    if (allowedMime.includes(file.mimetype)) return cb(null, true)
    const err = new Error('Invalid file type')
    err.code = 'INVALID_FILE_TYPE'
    return cb(err)
}

// Multer instances
const uploadProducts = multer({ storage: productsStorage, fileFilter: imageFileFilter });
// For user uploads we limit size to 5MB and restrict file types
const uploadUsers = multer({ storage: usersStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter });

const uploadProduct = uploadProducts.any();

module.exports =  { cloudinary, uploadProduct, uploadProducts, uploadUsers };