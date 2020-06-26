const Cities = require('../../models/Cities');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const {
    filterObj
} = require('../../utils/utils');

////////// FILES

///////////////// FUNCIONES

////////////// HANDLERS



exports.getAllCities = factory.getAll(Cities);
exports.getCity = factory.getOne(Cities);
exports.updateCity = factory.updateOne(Cities);
exports.deleteCity = factory.deleteOne(Cities);