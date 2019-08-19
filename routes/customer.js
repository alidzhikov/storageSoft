const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const routeValidators = require('../services/validators');

// #todo validators
router.get(
    '/',
    customerController.getAllCustomers
);
router.get(
    '/:customerId',
    customerController.getCustomer
);

router.put(
    '/:customerId',
    //routeValidators.createcustomerValidator,
    customerController.updateCustomer
);

router.post(
    '/',
    //routeValidators.createCustomerValidator,
    customerController.createCustomer
);

router.delete(
    '/:customerId',
    customerController.deleteCustomer
);

module.exports = router;