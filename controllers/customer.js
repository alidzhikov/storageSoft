const Customer = require('../models/customer');
const User = require('../models/user');
const errorHelper = require('../services/error-helper');

exports.getAllCustomers = (req, res, next) => {
    Customer.find({}, '-prices')
    .then(result => {
        res
        .status(200)
        .json({ message: 'All customers.', customers: result });
    })
    .catch(err => {
        next(err);
    });
};

exports.getCustomer = (req, res, next) => {
  const customerId = req.params.customerId;
  Customer.findById(customerId)
    .then(customer => {
      errorHelper.isItemFound(customer, 'customer');
      res.status(200).json({ message: 'Customer fetched.', customer: customer });
    })
    .catch(err => {
      next(err);
    });
};

exports.updateCustomer = (req, res, next) => { 
  const customerId = req.params.customerId;
  errorHelper.validationCheck(req);
  const fName = req.body.fName;
  const lName = req.body.lName;
  const companyName= req.body.companyName;
  const address = req.body.address;
  const vat = req.body.vat;
  const phoneNumber = req.body.phoneNumber; 
  const creator = req.body.creator;
  console.log(req.body);
  Customer.findById(customerId)
    .then(customer => {
      errorHelper.isItemFound(customer, 'customer');
      //errorHelper.isUserAuthorized(req);
      customer.fName = fName;
      customer.lName = lName;
      customer.companyName = companyName;
      customer.address = address;
      customer.vat = vat;
      customer.phoneNumber = phoneNumber;
      customer.creator = creator;
      return customer.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Customer updated!', customer: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createCustomer = (req, res, next) => {
  errorHelper.validationCheck(req);
  const newCustomer = new Customer({
    fName: req.body.fName,
    lName: req.body.lName,
    companyName: req.body.companyName,
    address: req.body.address,
    vat: req.body.vat,
    phoneNumber: req.body.phoneNumber,
    creator: req.body.creator
  });
  newCustomer
      .save()
      .then(customer => {
          res
              .status(201)
              .json({ message: 'Customer created successfully', customer: customer });
      })
      .catch(err => {
          next(err);
      });
};

exports.deleteCustomer = (req, res, next) => {
  const customerId = req.params.customerId;
  Customer.findById(customerId)
    .then(customer => {
      errorHelper.isItemFound(customer, 'customer');
     // errorHelper.isUserAuthorized(req);
      return Customer.findByIdAndDelete(customerId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      // #todo
      // user.customers.pull(customerId); 
      if(user){
        return user.save();
      }

    })
    .then(result => {
      res.status(200).json({ message: 'Deleted customer.', customerID: customerId });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
