const {
  Model
} = require('objection');

class ProductsPickUpPlaces extends Model {
  static get tableName() {
    return 'products_pick_up_places';
  }

  static get relationMappings() {
    const Cities = require('./Cities');

    return {
      city: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cities,
        join: {
          from: 'product.cityID',
          to: 'cities.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      "type": "object",
      "required": ["store", "address", "phone", "cityID"],
      "properties": {
        "store": {
          "type": "string"
        },
        "address": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "isActive": {
          "type": "integer",
          "default": "1"
        },
        "cityID": {
          "type": "integer"
        }
      }
    }
  }

}

module.exports = ProductsPickUpPlaces;