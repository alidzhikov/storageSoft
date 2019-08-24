const { body } = require('express-validator/check');
const User = require('../models/user');

//todo
exports.signupValidator =  [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        // .custom((value, { req }) => {
        //     return User.findOne({ email: value }).then(userDoc => {
        //       if (userDoc) {
        //         return Promise.reject('E-Mail address already exists!');
        //       }
        // });
        //})
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 }),
    body('fName')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 3 }),
    body('lName')
        .trim()
        .isLength({ min: 3 })
        .not()
        .isEmpty(),
    body('orgName')
        .trim()
        .isLength({ min: 3 })
        .not()
        .isEmpty(),
    body('mobilePhone')
        .trim()
        .not()
        .isEmpty()
];

exports.createProductValidator = [
    body('name')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 2 }),
    body('basePrice')
        .trim()
        .not()
        .isEmpty(),
    body('creator')
        .trim()
     //   .not()
       // .isEmpty()
];