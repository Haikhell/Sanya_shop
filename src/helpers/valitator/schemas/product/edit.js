const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    title: Joi.string(),
    price: Joi.number().integer(),
    description: Joi.string(),
    country: Joi.string(),
    photoPath: Joi.array(),
    category: Joi.array(),
    inStock: Joi.bool()
  })
  .strict();
