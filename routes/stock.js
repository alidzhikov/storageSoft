const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockroom');
const routeValidators = require('../services/validators');

// #todo validators
router.get(
    '/',
    stockController.getAllStocks
);
router.get(
    '/:stockId',
    stockController.getStock
);

router.put(
    '/:stockId',
    //routeValidators.createStockValidator,
    stockController.updateStock
);

router.post(
    '/',
    //routeValidators.createStockValidator,
    stockController.createStock
);

router.delete(
    '/:stockId',
    stockController.deleteStock
);

module.exports = router;