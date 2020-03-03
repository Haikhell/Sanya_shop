const { DB } = require('../../const');

module.exports = {
  name: DB.COLLECTION.BUCKET,
  opts: {
    wtimeout: 5000,
    w: 'majority'
  },
  validator: {
    $jsonSchema: {
      additionalProperties: false,
      bsonType: 'object',
      required: [ '_id', 'userId', 'productList', 'state' ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        userId: {
          bsonType: 'objectId'
        },
        productList: {
          bsonType: 'array'
        },
        state: {
          bsonType: 'number'
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
  init: async (db, collection) => collection.createIndex({ productList: 1 })
};
