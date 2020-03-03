const mongodb = require('mongodb');

const config = require('../config');

const client = new mongodb.MongoClient(config.MONGO_DB_URL, {
  poolSize: 50,
  wtimeout: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  w: 'majority'
});

module.exports = client;
