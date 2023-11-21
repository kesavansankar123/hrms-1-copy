const express = require('express');
const router = express.Router();
const authController = require('../../controller/loginuser controller');

router.get('/', authController.getUsers);

router.post('/registration', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/forget-email', authController.forgotPassword);

router.post('/resend-otp', authController.resendOTP);

router.post('/verifyOTP', authController.verifyOTP);

router.patch('/reset-password/:email', authController.resetPassword);

module.exports = router;
