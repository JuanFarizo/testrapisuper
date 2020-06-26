const {
    Model
} = require('objection');

class Buyers extends Model {
    static get tableName() {
        return 'buyers';
    }

    static get relationMappings() {
        const BuyersAddresses = require('./BuyersAddresses');
        const BuyersPersonalInfo = require('./BuyersPersonalInfo');
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: BuyersAddresses,
                join: {
                    from: 'user.id',
                    to: 'buyers.userId'
                }
            },
            addresses: {
                relation: Model.HasManyRelation,
                modelClass: BuyersAddresses,
                join: {
                    from: 'buyers_addresses.buyerID',
                    to: 'buyers.id'
                }
            },
            personalInfo: {
                relation: Model.HasOneRelation,
                modelClass: BuyersPersonalInfo,
                join: {
                    from: 'buyers_personal_info.buyerID',
                    to: 'buyers.id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['userID'],

            properties: {
                id: {
                    type: 'integer'
                },
                token: {
                    type: "string"
                },
                userID: {
                    type: "integer"
                },
            },
        };
    }

}

module.exports = Buyers;