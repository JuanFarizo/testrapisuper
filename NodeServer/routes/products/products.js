const express = require('express');

const authController = require('../../controllers/user/auth');
const productsController = require('../../controllers/products/products');

const router = express.Router();

// Products
router.route('/').get(productsController.getAllProducts);
router
  .route('/:id')
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
