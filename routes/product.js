const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const routeValidators = require('../services/validators');

// #todo validators
router.get(
    '/',
    productController.getAllProducts
);
router.get(
    '/:productId',
    productController.getProduct
);

router.put(
    '/:productId',
    //routeValidators.createProductValidator,
    productController.updateProduct
);

router.post(
    '/',
    routeValidators.createProductValidator,
    productController.createProduct
);

router.delete(
    '/:productId',
    productController.deleteProduct
);

module.exports = router;