const {
  Model
} = require('objection');

class SalesDiscountsActivity extends Model {
  static get tableName() {
    return 'sales_discounts_activity';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["discountID", "isActive"],
      "properties": {
        "discountID": {
          "type": "integer"
        },
        "date": {
          "type": "datetime"
        },
        "isActive": {
          "type": "integer"
        }
      }
    }
  }

}

module.exports = SalesDiscountsActivity;