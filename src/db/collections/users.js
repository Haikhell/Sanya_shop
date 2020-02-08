const { DB } = require('../../const');

module.exports = {
  name: DB.COLLECTION.USERS,
  opts: {
    wtimeout: 5000,
    w: 'majority'
  },
  validator: {
    $jsonSchema: {
      additionalProperties: false,
      bsonType: 'object',
      required: [ '_id', 'email', 'password', 'first_name', 'last_name', 'phone', 'basket' ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        email: {
          bsonType: 'string'
        },
        password: {
          bsonType: 'string'
        },
        first_name: {
          bsonType: 'string'
        },
        last_name: {
          bsonType: 'string'
        },
        phone: {
          bsonType: 'string'
        },
        basket: {
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
  init: async (db, collection) => collection.createIndex({ email: 1 })
};
