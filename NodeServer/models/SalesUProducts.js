const { Model } = require('objection');

class SalesUProducts extends Model {
  static get tableName() {
    return 'sales_u_products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'saleID',
        'productID',
        'price',
        'amount',
        'amountOrdered',
        'relevance',
        'controlStateID',
        'pickUpStateID',
        'isAddedByProductID',
        'isAdded',
        'noStock',
        'isDeleted',
        'deletedReasonID',
      ],
      properties: {
        saleID: {
          type: 'integer',
        },
        productID: {
          type: 'integer',
        },
        price: {
          type: 'float',
        },
        amount: {
          type: 'integer',
        },
        amountOrdered: {
          type: 'integer',
          default: 0,
        },
        relevance: {
          type: 'integer',
          default: 0,
        },
        controlStateID: {
          type: 'integer',
          default: 0,
        },
        pickUpStateID: {
          type: 'integer',
          default: 0,
        },
        isAddedByProductID: {
          type: 'integer',
          default: 0,
        },
        isAdded: {
          type: 'integer',
          default: 0,
        },
        noStock: {
          type: 'integer',
          default: 0,
        },
        isActive: {
          type: 'integer',
          default: 1,
        },
        isDeleted: {
          type: 'integer',
          default: 0,
        },
        deletedReasonID: {
          type: 'integer',
          default: 0,
        },
      },
    };
  }
}

module.exports = SalesUProducts;
