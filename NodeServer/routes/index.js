const express = require('express');
const router = express.Router();

router.use('/users', require('./users/user'));
router.use('/buyers', require('./buyers/buyers'));
router.use('/cities', require('./others/cities'));
router.use('/products', require('./products/products'));
router.use('/sales', require('./sales/sales'));

module.exports = router;
