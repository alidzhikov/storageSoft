const express = require('express');
const router = express.Router();
const stockroomController = require('../controllers/stockroom');
const routeValidators = require('../services/validators');

// #todo validators
router.get(
    '/',
    stockroomController.getAllStockrooms
);

router.get(
    '/:stockroomId',
    stockroomController.getStockroom
);

router.put(
    '/:stockroomId',
    //routeValidators.createStockValidator,
    stockroomController.updateStockroom
);

router.post(
    '/',
    //routeValidators.createStockValidator,
    stockroomController.createStockroom
);

router.delete(
    '/:stockroomId',
    stockroomController.deleteStockroom
);

module.exports = router;