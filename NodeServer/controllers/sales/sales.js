const Sales = require('../../models/Sales');
const SalesUProducts = require('../../models/SalesUProducts');

const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const factory = require('../handlerFactory');
const { filterObj } = require('../../utils/utils');
const CustomDate = require('../../utils/date');

exports.createSale = catchAsync(async (req, res, next) => {
  const newSale = await Sales.transaction(async (trx) => {
    // Creo un Sale
    const saleBody = filterObj(req.body, 'branchId', 'saleTypeID'); //TODO: date, totalProducts 'totalShipping' 'totalTotal', productsAmount, 	receptionDate
    saleBody.date = new CustomDate().ISO();
    saleBody.receptionDate = new CustomDate().ISO();

    let newSale = await Sales.query(trx).insert(saleBody);

    console.log(req.body);

    // Creo los Sales u products
    for (product of req.body.products) {
      console.log(product);
      let productBody = {
        saleID: newSale.id,
        productID: product.product.id,
        price: product.product.detail.offert || product.product.detail.price, //TODO: VER
        amount: product.quantity,
      };

      let newProduct = await SalesUProducts.query(trx).insert(productBody);
    }

    // Actualizo Sale
    const totalProducts = req.body.products.reduce((acc, el) => {
      return (
        acc +
        el.quantity * (el.product.detail.offert || el.product.detail.price)
      );
    }, 0);

    const productsAmount = req.body.products.reduce((acc, el) => {
      return acc + el.quantity;
    }, 0);

    newSale = await newSale.$query(trx).patchAndFetch({
      productsAmount: productsAmount,
      totalProducts: totalProducts,
      totalShipping: 0,
      totalTotal: totalProducts,
    });

    return newSale;
  });

  res.status(201).json({
    status: 'success',
    data: newSale,
  });
});

exports.getAllSales = factory.getAll(Sales);
exports.getSale = factory.getOne(Sales);
exports.updateSale = factory.updateOne(Sales);
exports.deleteSale = factory.deleteOne(Sales);
