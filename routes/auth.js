const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const routeValidators = require('../services/validators');

router.put(
    '/signup',
    routeValidators.signupValidator,
    authController.signup
);

router.post(
    '/login',
    //routeValidators.signupValidator,
    authController.login);

module.exports = router;