const mongodbClient = require('./client');
const { collections, initCollections } = require('./collections');

module.exports = { mongodbClient, collections, initCollections };
