const {
  Model
} = require('objection');

class ProductsBrands extends Model {
  static get tableName() {
    return 'products_brands';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["name"],
      "properties": {
        "name": {
          "type": "string"
        },
        "dateCreated": {
          "type": "datetime"
        },
        "isActive": {
          "type": "integer",
          "default": "1"
        }
      }
    }
  }

}

module.exports = ProductsBrands;