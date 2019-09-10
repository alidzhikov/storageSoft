const User = require('../models/user');
const errorHelper = require('../services/error-helper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {
    errorHelper.validationCheck(req);
    const email = req.body.email;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const companyName = req.body.companyName;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const vat = req.body.vat;
    const password = req.body.password;
    bcrypt.hash(password, 12)
    .then(hashedPsw => {
        const user = new User({
            email: email,
            password: hashedPsw,
            fName: fName,
            lName: lName,
            companyName: companyName,
            phoneNumber: phoneNumber,
            address: address,
            vat: vat
        });
        return user.save();
    })
    .then(result => {
        res
            .status(201)
            .json({ 
                message: 'A new user was successfully created.', 
                user: result 
            })
    })
    .catch(err => {
        next(err);
    });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if(!user){
                const error =  new Error('A user with this email could not be found');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if(!isEqual){
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({ 
                email: loadedUser.email, 
                userId: loadedUser._id.toString()
            }, 'secret', { expiresIn: '1h' });
            res.status(200).json({ token: token, currentUser: loadedUser })
        })
        .catch(err => {
            next(err);
        });
};