const {
  Model
} = require('objection');

class ProductsStockChangesWebsiteZones extends Model {
  static get tableName() {
    return 'products_stock_changes_website_zones';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["name", "websiteZone", "extraDescription"],
      "properties": {
        "name": {
          "type": "string"
        },
        "websiteZone": {
          "type": "string"
        },
        "extraDescription": {}
      }
    }
  }

}

module.exports = ProductsStockChangesWebsiteZones;