const {
  Model
} = require('objection');

class Employees extends Model {
  static get tableName() {
    return 'employees';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["roleID", "dni", "name", "surname", "cuit", "address"],
      "properties": {
        "roleID": {
          "type": "integer"
        },
        "dni": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "surname": {
          "type": "string"
        },
        "cuit": {
          "type": "string"
        },
        "dateJoined": {
          "type": "datetime"
        },
        "address": {
          "type": "string"
        }
      }
    }
  }

}

module.exports = Employees;