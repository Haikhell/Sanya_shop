const { DB } = require('../../const');

module.exports = {
  name: DB.COLLECTION.TASKS,
  opts: {
    wtimeout: 5000,
    w: 'majority'
  },
  validator: {
    $jsonSchema: {
      additionalProperties: false,
      bsonType: 'object',
      required: [ '_id', 'title', 'description', 'country', 'price', 'category', 'photo_path' ],
      properties: {
        _id: {
          bsonType: 'objectId'
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
        photo_path: {
          bsonType: 'array'
        },
        dueDate: {
          bsonType: 'date'
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
  init: async (db, collection) => collection.createIndex({ title: first })
};
