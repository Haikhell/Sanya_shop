const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    title: Joi.string(),
    price: Joi.number().integer(),
    discription: Joi.string(),
    country: Joi.string(),
    photo_path: Joi.array(),
    category: Joi.array()
  })
  .strict();
