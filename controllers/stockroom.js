const Stockroom = require('../models/stockroom').Stockroom;
const User = require('../models/user');
const errorHelper = require('../services/error-helper');

exports.getAllStockrooms = (req, res, next) => {
  Stockroom.find()
    .then(result => {
      res
        .status(200)
        .json({ message: 'All stockrooms.', stockrooms: result });
    })
    .catch(err => {
      next(err);
    });
};

exports.getStockroom = (req, res, next) => {
  const stockroomId = req.params.stockroomId;
  Stockroom.findById(stockroomId)
    .then(stockroom => {
      errorHelper.isItemFound(stockroom, 'stockroom');
      res.status(200).json({ message: 'Stockroom fetched.', stockroom: stockroom });
    })
    .catch(err => {
      next(err);
    });
};

exports.updateStockroom = (req, res, next) => {
  console.log(req.body);
  const stockroomId = req.params.stockroomId;
  errorHelper.validationCheck(req);
  const name = req.body.name;
  const description = req.body.description;
  const address = req.body.address;
  const isDefault = req.body.isDefault;
  const creator = req.body.creator;

  Stockroom.findById(stockroomId)
    .then(stockroom => {
      errorHelper.isItemFound(stockroom, 'stockroom');
      //errorHelper.isUserAuthorized(req);
      stockroom.name = name;
      stockroom.description = description;
      stockroom.address = address;
      stockroom.isDefault = isDefault;
      stockroom.creator = creator;
      return stockroom.save();
    })
    .then(unsetOldDefaultStockroom)
    .then(result => {
      res.status(200).json({ message: 'Stockroom updated!', stockroom: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createStockroom = (req, res, next) => {
  errorHelper.validationCheck(req);
  console.log(req.body);
  const newStockroom = new Stockroom({
    name: req.body.name,
    description: req.body.description,
    address: req.body.address,
    isDefault: req.body.isDefault,
    creator: req.body.creator
  });
  console.log(newStockroom);
  newStockroom
    .save()
    .then(unsetOldDefaultStockroom)
    .then(result => {
      console.log(result);
      res
        .status(201)
        .json({
          message: 'Stockroom created successfully' + result.oldDefaultStockroom ? ' and is now the default stockroom' : '',
          stockroom: result
        });
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteStockroom = (req, res, next) => {
  const stockroomId = req.params.stockroomId;
  Stockroom.findById(stockroomId)
    .then(stockroom => {
      errorHelper.isItemFound(stockroom, 'stockroom');
     // errorHelper.isUserAuthorized(req);
      return Stockroom.findByIdAndDelete(stockroomId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      // #todo
      // DELETE STOCKS IN THIS STOCKROOM
      // user.stockrooms.pull(stockId); 
      if (user) {
        return user.save();
      }
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted stockroom.', stockroomID: stockroomId });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

function unsetOldDefaultStockroom(stockroom) {
  if (!stockroom || !stockroom.isDefault) return stockroom;
  return Stockroom.findOne({ _id: { $ne: stockroom._id}, isDefault: true})
    .then(oldDefaultStockroom => {
      if (!oldDefaultStockroom) return stockroom;
      oldDefaultStockroom.isDefault = false;
      oldDefaultStockroom.save();
      return { oldDefaultStockroom: oldDefaultStockroom, stockroom: stockroom };
    });
}