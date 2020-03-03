const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    userId: Joi.string(),
    productList: Joi.array(),
    state: Joi.number()
  })
  .strict();
