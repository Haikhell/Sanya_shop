const _ = require('lodash');
const mongodb = require('mongodb');
const collectionsInfoAll = require('./collections');

const { DB } = require('../const');

const connectionDefaultOpts = Object.freeze({
  poolSize: 50,
  wtimeout: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  w: 'majority'
});

class DbManager {
  constructor() {
    this.connections = new Map();
  }
  getClient(name) {
    return this.collections.get(name);
  }
  async createConnections(url, con = connectionDefaultOpts, name = url) {
    try {
      const client = new mongodb.MongoClient(url, con);

      await client.connect();

      this.connections.set(name, client);

      client[DB.DBS] = {};

      return client;
    } catch (error) {
      throw error;
    }
  }
  initDb(clientNameOrClient, dbName) {
    const client =
      typeof clientNameOrClient === 'string' ? this.connections.get(clientNameOrClient) : clientNameOrClient;
    const db = client.db(dbName);

    if (!client[DB.DBS][dbName]) {
      client[DB.DBS][dbName] = { dbName, db, collections: {} };
    }
    return client[DB.DBS][dbName];
  }
  getDb(clientName, dbName) {
    const client = this.connections.get(clientName, dbName);

    return client[DB.DBS][dbName] || this.initDb(client, dbName);
  }
  initCollections(clientName, dbName, collectionsNameList = '*') {
    let collectionsInfoSelected;
    const { db, collections } = this.getDb(clientName, dbName);
    if (collectionsNameList === '*') {
      collectionsInfoSelected = collectionsInfoAll;
    } else {
      collectionsInfoSelected = _.pick(collectionsInfoAll, collectionsNameList);
    }
    const collectionsInfo = Object.values(collectionsInfoSelected);

    return each(collectionsInfo, async (collectionInfo) => {
      const collection = await db.createConnections(collectionInfo.name, collectionInfo.con);

      await db.command({
        collMod: collectionInfo.name,
        validator: collectionInfo.validator
      });

      if (typeof collectionInfo.init === 'function') {
        await collectionsInfo.init(db, collection);
      }

      collections[collectionsInfo.name] = collection;
    });
  }
}
module.exports = new DbManager();
