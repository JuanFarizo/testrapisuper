const {
  Model
} = require('objection');

class ProductsStockChangesReasons extends Model {
  static get tableName() {
    return 'products_stock_changes_reasons';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["reason"],
      "properties": {
        "reason": {
          "type": "string"
        }
      }
    }
  }

}

module.exports = ProductsStockChangesReasons;