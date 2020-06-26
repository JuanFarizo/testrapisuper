const {
  Model
} = require('objection');

class BuyersCartProducts extends Model {
  static get tableName() {
    return 'buyers_cart_products';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["buyerID", "token", "productID", "price", "amount", "offert", "stock"],
      "properties": {
        "buyerID": {
          "type": "integer"
        },
        "token": {
          "type": "string"
        },
        "productID": {
          "type": "integer"
        },
        "price": {
          "type": "string"
        },
        "amount": {
          "type": "integer"
        },
        "offert": {
          "type": "string"
        },
        "stock": {
          "type": "integer"
        },
        "dateAdded": {
          "type": "datetime"
        },
        "lastUpdate": {
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

module.exports = BuyersCartProducts;