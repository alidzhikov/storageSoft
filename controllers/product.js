const Product = require('../models/product').Product;
const User = require('../models/user');
const errorHelper = require('../services/error-helper');
const mongoose = require('mongoose');
const Decimal128 = mongoose.Types.Decimal128;

exports.getAllProducts = (req, res, next) => {
    Product.find()
    .then(result => {
      const products = result.map(product => product.toJSON());
      res
        .status(200)
        .json({ message: 'All products.', products: products });
    })
    .catch(err => {
        next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      product.basePrice = product.basePrice.toString();
      errorHelper.isItemFound(product, 'product');
      res.status(200).json({ message: 'Product fetched.', product: product.toJSON() });
    })
    .catch(err => {
      next(err);
    });
};

exports.updateProduct = (req, res, next) => {
  console.log(req.body);
  const productId = req.params.productId;
  errorHelper.validationCheck(req);
  const name = req.body.name;
  const basePrice = new Decimal128.fromString(req.body.basePrice);
  const size = req.body.size;
  const creator = req.body.creator;

  Product.findById(productId)
    .then(product => {
      errorHelper.isItemFound(product, 'product');
      //errorHelper.isUserAuthorized(req);
      product.name = name;
      product.basePrice = basePrice;
      product.size = size;
      product.creator = creator;
      return product.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Product updated!', product: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createProduct = (req, res, next) => {
  errorHelper.validationCheck(req);
  console.log(req.body);
  const newProduct = new Product({
      name: req.body.name,
      basePrice: new Decimal128.fromString(req.body.basePrice),
      size: req.body.size,
      creator: req.body.creator
  });
  newProduct
      .save()
      .then(product => {
          console.log(product);
          res
              .status(201)
              .json({ message: 'Product created successfully', product: product });
      })
      .catch(err => {
          next(err);
      });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      errorHelper.isItemFound(product, 'product');
     // errorHelper.isUserAuthorized(req);
      return Product.findByIdAndDelete(productId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      // #todo
      // user.products.pull(productId); 
      if(user){
        return user.save();
      }

    })
    .then(result => {
      res.status(200).json({ message: 'Deleted product.', productID: productId });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
