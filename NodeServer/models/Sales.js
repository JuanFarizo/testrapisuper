const { Model } = require('objection');

class Sales extends Model {
  static get tableName() {
    return 'sales';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'tempNum',
        'stateID',
        'buyerID',
        'addressID',
        'receiverID',
        'saleTypeID',
        'sellerID',
        'shippingNeeded',
        'totalProducts',
        'totalShipping',
        'totalTotal',
        'productsAmount',
        'receptionDate',
        'receptionTimeRange',
        'paymentPrediction',
        'paymentStateID',
        'paymentTypeID',
        'paymentEmployeeID',
        'notes',
        'temporalAccountID',
        'buyerIP',
        'bags',
        'boxes',
        'freezer',
        'refrigerator',
        'controlEmployeeID',
        'makingEmployeeID',
        'shippingEmployeeID',
        'isPrinted',
        'isStockControled',
        'controlNotes',
        'eggs6',
        'eggs30',
        'coal3',
        'coal5',
        'buyerEmployeeID',
      ],
      properties: {
        tempNum: {
          type: 'integer',
          default: 0,
        },
        stateID: {
          type: 'integer',
          default: 1,
        },
        buyerID: {
          type: 'integer',
          default: 0,
        },
        addressID: {
          type: 'integer',
          default: 19, // TODO: CREAR ADDRESS 0 O PONER VALOR NULO
        },
        receiverID: {
          type: 'integer',
          default: 0,
        },
        saleTypeID: {
          type: 'integer',
          default: 0,
        },
        sellerID: {
          type: 'integer',
          default: 0,
        },
        date: {
          type: 'datetime',
        },
        shippingNeeded: {
          type: 'integer',
          default: 0,
        },
        totalProducts: {
          type: 'float',
          default: '',
        },
        totalShipping: {
          type: 'float',
          default: '',
        },
        totalTotal: {
          type: 'float',
          default: '',
        },
        productsAmount: {
          type: 'integer',
          default: 0,
        },
        receptionTime: {
          type: 'integer',
          default: 0,
        },
        receptionDate: {
          tyle: 'date',
          default: new Date(),
        },
        receptionTimeRange: {
          type: 'integer',
          default: 0,
        },
        paymentPrediction: {
          type: 'string',
          default: '',
        },
        paymentStateID: {
          type: 'integer',
          default: 1,
        },
        paymentTypeID: {
          type: 'integer',
          default: 0,
        },
        paymentEmployeeID: {
          type: 'integer',
          default: 0,
        },
        notes: {
          type: 'string',
          default: '',
        },
        temporalAccountID: {
          type: 'integer',
          default: 0,
        },
        buyerIP: {
          type: 'string',
          default: '',
        },
        bags: {
          type: 'integer',
          default: 0,
        },
        boxes: {
          type: 'integer',
          default: 0,
        },
        freezer: {
          type: 'integer',
          default: 0,
        },
        refrigerator: {
          type: 'integer',
          default: 0,
        },
        controlEmployeeID: {
          type: 'integer',
          default: 0,
        },
        makingEmployeeID: {
          type: 'integer',
          default: 0,
        },
        shippingEmployeeID: {
          type: 'integer',
          default: 0,
        },
        isPrinted: {
          type: 'integer',
          default: 0,
        },
        isStockControled: {
          type: 'integer',
          default: 0,
        },
        controlNotes: {
          type: 'string',
          default: '',
        },
        eggs6: {
          type: 'integer',
          default: 0,
        },
        eggs30: {
          type: 'integer',
          default: 0,
        },
        coal3: {
          type: 'integer',
          default: 0,
        },
        coal5: {
          type: 'integer',
          default: 0,
        },
        buyerEmployeeID: {
          type: 'integer',
          default: 0,
        },
        paymentDatetime: {
          type: 'datetime',
          default: '0000-00-00',
        },
      },
    };
  }
}

module.exports = Sales;
