const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { uploadUsers } = require("../config/cloudnary");
const admin = require('../middleware/Admin');
const Authenticate = require('../middleware/Authenticate.js');

router.post('/auth/signup', uploadUsers.single("photo"), AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/forgot-password', AuthController.forgotPassword)
router.post('/auth/reset-password', AuthController.resetPassword);
router.get('/user/users', Authenticate,admin('ADMIN'), AuthController.getAllUsers);
router.get('/user/profile', Authenticate, AuthController.getUserProfile);
router.put('/user/update', Authenticate, uploadUsers.single('photo'), AuthController.updateProfile);


module.exports = router;
