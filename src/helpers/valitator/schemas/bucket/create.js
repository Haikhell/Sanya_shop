const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    userId: Joi.string().required(),
    productList: Joi.array().required(),
    state: Joi.number().required()
  })
  .strict();
