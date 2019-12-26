const Order = require('../models/order');
const Customer = require('../models/customer');
const Price = require('../models/price').Price;
const User = require('../models/user');
const errorHelper = require('../services/error-helper');
const mongoose = require('mongoose');
const Decimal128 = mongoose.Types.Decimal128;

exports.getAllOrders = (req, res, next) => {
    Order.find()
    .then(result => {
      const orders = result.map(order => order.toJSON());
        res
        .status(200)
        .json({ message: 'All orders.', orders: orders });
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
      res.status(200).json({ message: 'Order fetched.', order: order.toJSON() });
    })
    .catch(err => {
      next(err);
    });
};

exports.updateOrder = (req, res, next) => { 
  const orderId = req.params.orderId;
  errorHelper.validationCheck(req);
  const orderProducts = req.body.orderProducts.map(oProd => {
    oProd.price = new Decimal128.fromString(oProd.price);
    oProd.product.basePrice = new Decimal128.fromString(oProd.product.basePrice);
    return oProd;
  });
  const customerID = req.body.customerID;
  const creator = req.body.creator;
  const paidAmount = req.body.paidAmount ? req.body.paidAmount : 0;
  Order.findById(orderId)
    .then(order => {
      errorHelper.isItemFound(order, 'order');
      //errorHelper.isUserAuthorized(req);
      order.orderProducts = orderProducts;
      order.customerID = customerID;
      order.creator = creator;
      order.paidAmount = new Decimal128.fromString(paidAmount);
      return order.save();
    })
    .then(result => {
      updateCustomerPrices(result);
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
    orderProducts: req.body.orderProducts.map(oProd => {
      oProd.price = new Decimal128.fromString(oProd.price);
      oProd.product.basePrice = new Decimal128.fromString(oProd.product.basePrice);
      return oProd;
    }),
    customerID: req.body.customerID,
    creator: req.body.creator,
    paidAmount: new Decimal128.fromString((req.body.paidAmount ? req.body.paidAmount : 0).toString())
  });

  newOrder
    .save()
    .then(order => {
      updateCustomerPrices(order);
      return order;
    })
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

updateCustomerPrices = order => {
  Customer.findById(order.customerID)
    .then(customer => {
      errorHelper.isItemFound(customer, 'customer');
      if (!customer.prices)
        customer.prices = [];
      order.orderProducts.forEach(orderProduct => {
        const priceObj = new Price({
          productId: orderProduct.product._id,
          price: orderProduct.price,
          creator: order.creator
        });
        const existingPriceForProduct = customer.prices.findIndex(existingPrice => priceObj.productId.toString() === existingPrice.productId.toString());
        if (existingPriceForProduct === -1) {
          if(orderProduct.price.toString() !== orderProduct.product.basePrice.toString())
            customer.prices.push(priceObj);
        } else if(customer.prices[existingPriceForProduct].price.toString() !== priceObj.price.toString()){         
          customer.prices[existingPriceForProduct] = priceObj;
        }
      });
      customer.save();
    });
}