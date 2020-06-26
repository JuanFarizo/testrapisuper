const express = require('express');

const authController = require('../../controllers/user/auth');
const citiesController = require('../../controllers/others/cities');

const router = express.Router();

router.route('/:id').get(citiesController.getCity);
router.route('/').get(citiesController.getAllCities);
router
    .route('/:id')
    .get(citiesController.getCity)
    .patch(citiesController.updateCity)
    .delete(citiesController.deleteCity);

module.exports = router;