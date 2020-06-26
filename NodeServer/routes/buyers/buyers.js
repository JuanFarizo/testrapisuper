const express = require('express');

const authController = require('../../controllers/user/auth');
const userController = require('../../controllers/user/user');
const buyersController = require('../../controllers/buyers/buyers');

const router = express.Router();

router.post('/signup', authController.signup("buyer"));

// //ME
router.use(authController.protect); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS PROTEGIDAS (REQUIEREN LOGIN)
router.get('/me', buyersController.getMe, userController.getUser);
router.patch('/updateMe', buyersController.updateMe);
router.delete('/deleteMe', buyersController.deleteMe);

// Buyers
router.use(authController.restrictTo('admin')); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS RESTRINGIDAS (REQUIEREN EL 'role' ASIGNADO)
router.route('/:id').get(buyersController.getBuyer);
router.route('/').get(buyersController.getAllBuyers);
router
    .route('/:id')
    .get(buyersController.getBuyer)
    .patch(buyersController.updateBuyer)
    .delete(buyersController.deleteBuyer);

module.exports = router;