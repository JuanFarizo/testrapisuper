const express = require('express');

const authController = require('../../controllers/user/auth');
const salesController = require('../../controllers/sales/sales');

const router = express.Router();

// Sales
// router.use(authController.restrictTo('admin')); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS RESTRINGIDAS (REQUIEREN EL 'role' ASIGNADO)
router
  .route('/')
  .get(salesController.getAllSales)
  .post(salesController.createSale);
router
  .route('/:id')
  .get(salesController.getSale)
  .patch(salesController.updateSale)
  .delete(salesController.deleteSale);

module.exports = router;
