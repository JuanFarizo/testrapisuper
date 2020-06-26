const {
    Model
} = require('objection');

class BuyersPersonalInfo extends Model {
    static get tableName() {
        return 'buyers_personal_info';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['buyerID'],

            properties: {
                id: {
                    type: 'integer'
                },
                buyerID: {
                    type: "integer"
                },
                relevance: {
                    type: "integer"
                },
                name: {
                    type: "string"
                },
                surname: {
                    type: "string"
                },
                phone: {
                    type: "string"
                },
                dob: {
                    type: "date"
                },
                isActive: {
                    type: "Integer"
                }
            },
        };
    }

}

module.exports = BuyersPersonalInfo;