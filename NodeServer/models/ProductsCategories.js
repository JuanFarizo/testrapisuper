const {
  Model
} = require('objection');

class ProductsCategories extends Model {
  static get tableName() {
    return 'products_categories';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["name", "parentID"],
      "properties": {
        "name": {
          "type": "string"
        },
        "parentID": {
          "type": "integer"
        },
        "isShowed": {
          "type": "integer",
          "default": "1"
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

module.exports = ProductsCategories;