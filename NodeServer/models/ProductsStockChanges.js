const {
  Model
} = require('objection');

class ProductsStockChanges extends Model {
  static get tableName() {
    return 'products_stock_changes';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["productID", "amount", "actualStock", "employeeID", "reasonID", "websiteZoneID", "notes"],
      "properties": {
        "productID": {
          "type": "integer"
        },
        "amount": {
          "type": "string"
        },
        "actualStock": {
          "type": "integer"
        },
        "employeeID": {
          "type": "integer"
        },
        "reasonID": {
          "type": "integer"
        },
        "websiteZoneID": {
          "type": "integer"
        },
        "notes": {},
        "date": {
          "type": "datetime"
        }
      }
    }
  }

}

module.exports = ProductsStockChanges;