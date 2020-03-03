const express = require('express');

const productRouter = require('./product');
const usersRouter = require('./users');
const bucketRouter = require('./bucket');

const router = express.Router();

router.use('/product', productRouter);

router.use('/users', usersRouter);

router.use('/bucket', bucketRouter);

module.exports = router;
