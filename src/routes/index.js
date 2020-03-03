const express = require('express');

const api = require('./api');

const router = express.Router();

router.use('/api', api);

router.get('/', async (req, res) => res.status(200).send({ message: 'API' }));
module.exports = router;
