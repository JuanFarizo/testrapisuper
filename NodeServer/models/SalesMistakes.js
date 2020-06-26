const {
  Model
} = require('objection');

class SalesMistakes extends Model {
  static get tableName() {
    return 'sales_mistakes';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["typeID", "stateID", "saleID", "responsibleEmployeeID", "description"],
      "properties": {
        "dateTime": {
          "type": "datetime"
        },
        "typeID": {
          "type": "integer"
        },
        "stateID": {
          "type": "integer"
        },
        "saleID": {
          "type": "integer"
        },
        "responsibleEmployeeID": {
          "type": "integer"
        },
        "description": {},
        "isActive": {
          "type": "integer",
          "default": "1"
        }
      }
    }
  }

}

module.exports = SalesMistakes;