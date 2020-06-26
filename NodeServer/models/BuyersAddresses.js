const {
    Model
} = require('objection');

class BuyersAddresses extends Model {
    static get tableName() {
        return 'buyers_addresses';
    }

    static get relationMappings() {
        const Cities = require('./Cities');
        return {
            city: {
                relation: Model.BelongsToOneRelation,
                modelClass: Cities,
                join: {
                    from: 'buyers_addresses.cityID',
                    to: 'cities.id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['buyerID'],

            properties: {
                id: {
                    type: 'integer'
                },
                cityID: {
                    type: "integer"
                },
                buyerID: {
                    type: "integer"
                },
                streetName: {
                    type: "string"
                },
                streetNumber: {
                    type: "String"
                },
                floorAndDepartament: {
                    type: "String"
                },
                extraReferences: {
                    type: "String"
                },
                isActive: {
                    type: "Integer"
                }
            },
        };
    }

}

module.exports = BuyersAddresses;