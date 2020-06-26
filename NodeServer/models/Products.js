const { Model } = require('objection');

class Products extends Model {
  static get tableName() {
    return 'products';
  }

  static get relationMappings() {
    const ProductsDetails = require('./ProductsDetails');
    const ProductsPickUpPlaces = require('./ProductsPickUpPlaces');
    return {
      detail: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductsDetails,
        join: {
          from: 'products.detailsID',
          to: 'products_details.id',
        },
      },
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: Products,
        join: {
          from: 'products.productParentID',
          to: 'products.id',
        },
      },
      pickUpPlace: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductsPickUpPlaces,
        join: {
          from: 'products.pickUpPlaceID',
          to: 'products_pick_up_places.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'detailsID',
        'fullName',
        'variantName',
        'stock',
        'stockAlert',
        'iva',
        'pickUpPlaceID',
        'bottleID',
        'variantPrice',
        'variantOffert',
        'productParentID',
        'productParentMultiplier',
        'extraDescription',
        'barsCode',
        'isParent',
        'hasInfiniteStock',
        'pickUpPlaceHasStock',
      ],
      properties: {
        detailsID: {
          type: 'integer',
        },
        fullName: {
          type: 'string',
        },
        variantName: {
          type: 'string',
        },
        stock: {
          type: 'integer',
        },
        stockAlert: {
          type: 'integer',
        },
        iva: {
          type: 'string',
        },
        pickUpPlaceID: {
          type: 'integer',
        },
        bottleID: {
          type: 'integer',
        },
        variantPrice: {
          type: 'string',
        },
        variantOffert: {
          type: 'string',
        },
        productParentID: {
          type: 'integer',
        },
        productParentMultiplier: {
          type: 'string',
        },
        extraDescription: {
          type: 'string',
        },
        imagesAmount: {
          type: 'integer',
          default: 1,
        },
        barsCode: {
          type: 'string',
        },
        isActive: {
          type: 'integer',
          default: 1,
        },
        isArchived: {
          type: 'integer',
          default: 0,
        },
        onlySuppliers: {
          type: 'integer',
          default: 0,
        },
        dateCreated: {
          type: 'datetime',
        },
        isParent: {
          type: 'integer',
        },
        hasInfiniteStock: {
          type: 'integer',
        },
        pickUpPlaceHasStock: {
          type: 'integer',
        },
      },
    };
  }
}

module.exports = Products;
