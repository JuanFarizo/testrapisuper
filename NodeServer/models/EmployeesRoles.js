const {
  Model
} = require('objection');

class EmployeesRoles extends Model {
  static get tableName() {
    return 'employees_roles';
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["role"],
      "properties": {
        "role": {
          "type": "string"
        }
      }
    }
  }

}

module.exports = EmployeesRoles;