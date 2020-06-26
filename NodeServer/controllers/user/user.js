const User = require('../../models/User');
const Buyers = require('../../models/Buyers');
const BuyersPersonalInfo = require('../../models/BuyersPersonalInfo');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const {
  filterObj
} = require('../../utils/utils');

////////// FILES

///////////////// FUNCIONES

////////////// HANDLERS
exports.getAllUsers = factory.getAll(User, '', true);
exports.getUser = factory.getOne(User, '[buyer.[personalInfo, addresses.city]]', true); // Agrega al json de usuarios, un objeto buyers con la ifnormacion del buyer asociado, a su vez este tiene personalInfo y addresses y esta tiene la city
exports.updateUser = factory.updateOne(User); //Do not use for password
exports.deleteUser = factory.deleteOne(User);