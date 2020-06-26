const {
  Model
} = require('objection');

class ProductsDetailsUProductsTags extends Model {
  static get tableName() {
    return 'products_details_u_products_tags';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["productDetailsID", "tagID"],
      "properties": {
        "productDetailsID": {
          "type": "integer"
        },
        "tagID": {
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

module.exports = ProductsDetailsUProductsTags;