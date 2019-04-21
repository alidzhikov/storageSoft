const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const routeValidators = require('../services/validators');

router.put(
    '/signup',
    routeValidators.signupValidator,
    authController.signup
);

//router.post('/login', authController.login);

module.exports = router;