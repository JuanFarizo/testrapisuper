const {
  Model
} = require('objection');

class SalesDiscountsOvers extends Model {
  static get tableName() {
    return 'sales_discounts_overs';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["over"],
      "properties": {
        "over": {
          "type": "string"
        }
      }
    }
  }

}

module.exports = SalesDiscountsOvers;