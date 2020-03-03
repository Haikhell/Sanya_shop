const express = require('express');
const now = new Date();

const product = require('../../../controller/product');

const { schemas: validationSchemas, middleware: validate } = require('../../../middlewares/validate');

const router = express.Router();

router.get('/get/:id', async (req, res) => {
  res.send(await product.getProduct(req.params.id));
});

router.put('/edit/:id', validate(validationSchemas.product.edit), async (req, res) => {
  res.send(await product.edit(req.body, now, req.params.id));
});

router.post('/create', validate(validationSchemas.product.create), async function(req, res) {
  res.send(await product.create(req.body, now));
});

router.delete('/delete');

module.exports = router;
