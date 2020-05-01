const Stock = require('../models/stock').Stock;
const User = require('../models/user');
const errorHelper = require('../services/error-helper');
const mongoose = require('mongoose');
const Product = require('../models/product').Product;
const Order = require('../models/order');

exports.getAllStocks = (req, res, next) => {
  Stock.find()
    .populate('product')
    .populate('stockroom', '_id name')
    .then(result => {
      res
        .status(200)
        .json({ message: 'All stocks.', stocks: result });
    })
    .catch(err => {
      next(err);
    });
};

exports.getStock = (req, res, next) => {
  const stockId = req.params.stockId;
  Stock.findById(stockId)
    .then(stock => {
      errorHelper.isItemFound(stock, 'stock');
      res.status(200).json({ message: 'Stock fetched.', stock: stock });
    })
    .catch(err => {
      next(err);
    });
};

exports.getProductOrders = (req, res, next) => {
  Product.find()
    .then(products => products.map(product => new Stock({product: product, amount: 0, creator: product.creator})))
    .then(orderedStocks => {
      Order.find({}, 'orderProducts')
        .then(orders => {
          orders.forEach(order => 
            order.orderProducts.forEach(orderProd => {
              const index = orderedStocks.findIndex(ordStock => ordStock.product._id.toString() === orderProd.product._id.toString());
              if (index !== -1)
                orderedStocks[index].amounts += orderProd.qty;//[stockroom.name]
            })
          );
          res
            .status(200)
            .json({ message: 'Ordered items amount.', orderedStocks: orderedStocks });
          })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
        next(err);
    });
};

exports.updateStock = (req, res, next) => {
  console.log(req.body);
  const stockId = req.params.stockId;
  errorHelper.validationCheck(req);
  const product = req.body.product;
  const amount = req.body.amount;
  const creator = req.body.creator;

  Stock.findById(stockId)
    .then(stock => {
      errorHelper.isItemFound(stock, 'stock');
      //errorHelper.isUserAuthorized(req);
      stock.product = product;
      stock.amount = amount;
      stock.stockroom = req.body.stockroom;
      stock.creator = creator;
      return stock.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Stock updated!', stock: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createStock = (req, res, next) => {
  errorHelper.validationCheck(req);
  console.log(req.body);
  const newStock = new Stock({
      product: req.body.product,
      amount: req.body.amount,
      stockroom: req.body.stockroom,
      creator: req.body.creator
  });
  newStock
      .save()
      .then(stock => {
          console.log(stock);
          res
              .status(201)
              .json({ message: 'Stock created successfully', stock: stock });
      })
      .catch(err => {
          next(err);
      });
};

exports.deleteStock = (req, res, next) => {
  const stockId = req.params.stockId;
  Stock.findById(stockId)
    .then(stock => {
      errorHelper.isItemFound(stock, 'stock');
     // errorHelper.isUserAuthorized(req);
      return Stock.findByIdAndDelete(stockId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      // #todo
      // user.stocks.pull(stockId); 
      if (user) {
        return user.save();
      }

    })
    .then(result => {
      res.status(200).json({ message: 'Deleted stock.', stockID: stockId });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
