const http = require('http');

const dbHelper = require('./db');
const CONSTANTS = require('./const');
const config = require('./config');

(async () => {
  await dbHelper.mongodbClient.connect();
  await dbHelper.initCollections(dbHelper.mongodbClient.db(CONSTANTS.DB.DB_NAME));

  const app = require('./app');
  const httpServer = http.createServer(app);

  httpServer.listen(config.PORT, config.HOST);
})();
