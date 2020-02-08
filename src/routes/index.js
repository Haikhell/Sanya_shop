const express = require('express');

const { attachDb } = require('../middlewares');

const userRouter = require('./user');

const router = express.Router();

router.use(attachDb);

router.get('/', async (req, res) => res.status(200).send({ message: 'API' }));

router.use('/user', userRouter);

module.exports = router;
