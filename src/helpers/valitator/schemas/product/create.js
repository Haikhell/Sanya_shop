const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    title: Joi.string().required(),
    price: Joi.number().integer().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    photoPath: Joi.array().required(),
    category: Joi.array().required(),
    inStock: Joi.bool().required()
  })
  .strict();
