const {
  Model
} = require('objection');

class SalesDiscounts extends Model {
  static get tableName() {
    return 'sales_discounts';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["discountOverID", "discountName", "discountAmount"],
      "properties": {
        "discountOverID": {
          "type": "integer"
        },
        "discountName": {
          "type": "string"
        },
        "discountAmount": {
          "type": "string"
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

module.exports = SalesDiscounts;