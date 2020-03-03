const usersCollectionInfo = require('./users');
const productCollectionInfo = require('./product');
const sessionCollectionInfo = require('./session');
const bucketCollectionInfo = require('./bucket');

const { each } = require('../../helpers/async');

const collections = {};
const collectionsInformation = [
  usersCollectionInfo,
  productCollectionInfo,
  sessionCollectionInfo,
  bucketCollectionInfo
];

module.exports.collections = collections;

module.exports.initCollections = async (db) =>
  each(collectionsInformation, async (collectionsInformation) => {
    const collection = await db.createCollection(collectionsInformation.name, collectionsInformation.opts);

    await db.command({
      collMod: collectionsInformation.name,
      validator: collectionsInformation.validator
    });

    await collectionsInformation.init(db, collection);

    collections[collectionsInformation.name] = collection;
  });
