const Buyers = require('../../models/Buyers');
const BuyersCartProducts = require('../../models/BuyersCartProducts');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const {
    filterObj
} = require('../../utils/utils');

////////// FILES

///////////////// FUNCIONES

////////////// HANDLERS



exports.getAllBuyers = factory.getAll(BuyersCartProducts);
exports.getBuyer = factory.getOne(BuyersCartProducts);
exports.updateBuyer = factory.updateOne(BuyersCartProducts);
exports.deleteBuyer = factory.deleteOne(BuyersCartProducts);