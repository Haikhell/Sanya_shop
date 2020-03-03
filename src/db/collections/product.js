const { DB } = require('../../const');

module.exports = {
  name: DB.COLLECTION.PRODUCTS,
  opts: {
    wtimeout: 5000,
    w: 'majority'
  },
  validator: {
    $jsonSchema: {
      additionalProperties: false,
      bsonType: 'object',
      required: [ '_id', 'title', 'description', 'country', 'price', 'category', 'photoPath', 'inStock' ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        inStock: {
          bsonType: 'bool'
        },
        title: {
          bsonType: 'string'
        },
        description: {
          bsonType: 'string'
        },
        country: {
          bsonType: 'string'
        },
        price: {
          bsonType: 'number'
        },
        category: {
          bsonType: 'array'
        },
        photoPath: {
          bsonType: 'array'
        },

        createdAt: {
          bsonType: 'date'
        },
        updatedAt: {
          bsonType: 'date'
        }
      }
    }
  },
  init: async (db, collection) => collection.createIndex({ title: 1 })
};
