const {
    Model
} = require('objection');

class Cities extends Model {
    static get tableName() {
        return 'cities';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['city'],

            properties: {
                id: {
                    type: 'integer'
                },
                city: {
                    type: "string"
                },

            },
        };
    }

}

module.exports = Cities;