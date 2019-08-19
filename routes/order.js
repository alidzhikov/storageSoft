const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const routeValidators = require('../services/validators');

// #todo validators
router.get(
    '/',
    orderController.getAllOrders
);
router.get(
    '/:orderId',
    orderController.getOrder
);

router.put(
    '/:orderId',
    //routeValidators.createOrderValidator,
    orderController.updateOrder
);

router.post(
    '/',
    //routeValidators.createOrderValidator,
    orderController.createOrder
);

router.delete(
    '/:orderId',
    orderController.deleteOrder
);

module.exports = router;