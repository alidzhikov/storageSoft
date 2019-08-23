const Order = require('../models/order');
const User = require('../models/user');
const errorHelper = require('../services/error-helper');

exports.getAllOrders = (req, res, next) => {
    Order.find()
    .then(result => {
        res
        .status(200)
        .json({ message: 'All orders.', orders: result });
    })
    .catch(err => {
        next(err);
    });
};

exports.getOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => {
      errorHelper.isItemFound(order, 'order');
      res.status(200).json({ message: 'Order fetched.', order: order });
    })
    .catch(err => {
      next(err);
    });
};

exports.updateOrder = (req, res, next) => { 
  const orderId = req.params.orderId;
  errorHelper.validationCheck(req);
  const products = req.body.products;
  const customerID = req.body.customerID;
  const creator = req.body.creator;

  Order.findById(orderId)
    .then(order => {
      errorHelper.isItemFound(order, 'order');
      //errorHelper.isUserAuthorized(req);
      order.orderProducts = products;
      order.customerID = customerID;
      order.creator = creator;
      return order.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Order updated!', order: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createOrder = (req, res, next) => {
  errorHelper.validationCheck(req);
  const newOrder = new Order({
    products: req.body.products,
    customerID: req.body.customerID,
    creator: req.body.creator,
  });
  newOrder
      .save()
      .then(order => {
          res
              .status(201)
              .json({ message: 'Order created successfully', order: order });
      })
      .catch(err => {
          next(err);
      });
};

exports.deleteOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => {
      errorHelper.isItemFound(order, 'order');
     // errorHelper.isUserAuthorized(req);
      return Order.findByIdAndDelete(orderId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      // #todo
      // user.orders.pull(orderId); 
      if(user){
        return user.save();
      }

    })
    .then(result => {
      res.status(200).json({ message: 'Deleted order.', orderID: orderId });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
