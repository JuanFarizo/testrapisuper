const {
  Model
} = require('objection');

class ProductsDetailsUProductsCategories extends Model {
  static get tableName() {
    return 'products_details_u_products_categories';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["productDetailsID", "categoryID"],
      "properties": {
        "productDetailsID": {
          "type": "integer"
        },
        "categoryID": {
          "type": "integer"
        },
        "isActive": {
          "type": "integer",
          "default": "1"
        },
        "dateCreated": {
          "type": "datetime"
        }
      }
    }
  }

}

module.exports = ProductsDetailsUProductsCategories;