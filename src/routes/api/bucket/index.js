const express = require('express');
const now = new Date();
const bucketController = require('../../../controller/bucket');
const { schemas: validationSchemas, middleware: validate } = require('../../../middlewares/validate');

const router = express.Router();

router.get('/get', async (req, res) => {
  res.send(await bucketController.get(req.body));
});

router.post('/append', validate(validationSchemas.bucket.create), async (req, res) => {
  res.send(await bucketController.append(req.body, now));
});
router.put('/edit', validate(validationSchemas.bucket.edit), async (req, res) => {
  res.send(await bucketController.edit(req.body));
});

module.exports = router;
