const {
  Model
} = require('objection');

class SalesMistakesStates extends Model {
  static get tableName() {
    return 'sales_mistakes_states';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["state"],
      "properties": {
        "state": {
          "type": "string"
        }
      }
    }
  }

}

module.exports = SalesMistakesStates;