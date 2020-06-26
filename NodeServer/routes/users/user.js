const express = require('express');

const authController = require('../../controllers/user/auth');
const userController = require('../../controllers/user/user');

const router = express.Router();

// Auth
console.log("POR ACA")
router.post('/signin', authController.signin);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS PROTEGIDAS (REQUIEREN LOGIN)

//ME
router.patch('/updateMyPassword', authController.updatePassword);

// Users
router.use(authController.restrictTo('admin')); // A PARTIR DE ESTE CONTROLADOR, SIGUIENTES RUTAS RESTRINGIDAS (REQUIEREN EL 'role' ASIGNADO)
router.route('/:id').get(userController.getUser);
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;