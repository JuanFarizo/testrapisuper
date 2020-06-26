const {
  Model
} = require('objection');

class ProductsDetails extends Model {
  static get tableName() {
    return 'products_details';
  }

  static get relationMappings() {
    const ProductsBrands = require('./ProductsBrands');
    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: ProductsBrands,
        join: {
          from: 'product.brandsID',
          to: 'product_brands.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["brandID", "name", "price", "offert", "description"],
      "properties": {
        "brandID": {
          "type": "integer"
        },
        "name": {
          "type": "string"
        },
        "price": {
          "type": "string"
        },
        "offert": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "dateCreated": {
          "type": "datetime"
        }
      }
    }
  }

}

module.exports = ProductsDetails;