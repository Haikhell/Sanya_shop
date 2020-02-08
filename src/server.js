const http = require('http');

const App = require('./app');
const dbManager = require('./db');

const config = require('./config');

(async () => {
  const client = await dbManager.createConnection(config.MONGO_DB_URL);
  await dbManager.initCollections(config.MONGO_DB_URL, config.MONGO_DB_NAME);

  client.on('error', (err) => {
    console.log(err);
    process.exit(1);
  });

  const app = App();
  const httpServer = http.createServer(app);

  httpServer.listen(config.PORT, config.HOST);
})();
