const Products = require('../../models/Products');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const { filterObj } = require('../../utils/utils');

////////// FILES

///////////////// FUNCIONES
// getOne = (Model, popOptions) => {
//     return catchAsync(async (req, res, next) => {
//         query = Products.query().select()

//         if (req.body.stock) {
//             query.andWhere(product.stock > 0).
//         }

//         const doc = await features.query;

//         if (!doc) {
//             return next(new AppError('No document found with that id', 404));
//         }

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 data: doc,
//             },
//         });
//     });
// };
////////////// HANDLERS

exports.getAllProducts = factory.getAll(Products, '[detail]');
exports.getProduct = factory.getOne(Products, '[detail]');
exports.updateProduct = factory.updateOne(Products);
exports.deleteProduct = factory.deleteOne(Products);
