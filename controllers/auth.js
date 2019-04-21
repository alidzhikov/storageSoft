const User = require('../models/user');
const errorHelper = require('../services/error-helper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {
    console.log('auth ctrr');
    errorHelper.validationCheck(req);
    const email = req.body.email;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const orgName = req.body.orgName;
    const mobilePhone = req.body.mobilePhone;
    const password = req.body.password;
    bcrypt.hash(password, 12)
    .then(hashedPsw => {
        const user = new User({
            email: email,
            password: hashedPsw,
            fName: fName,
            lName: lName,
            orgName: orgName,
            mobilePhone: mobilePhone,
        });
        return user.save();
    })
    .then(result => {
        res
            .status(201)
            .json({ 
                message: 'A new user was successfully created.', 
                userId: result._id 
            })
    })
    .catch(err => {
        next(err);
    });
}