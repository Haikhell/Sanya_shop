const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    title: Joi.string().required(),
    price: Joi.number().integer().required(),
    discription: Joi.string().required(),
    country: Joi.string().required(),
    photo_path: Joi.array().required(),
    category: Joi.array().required()
  })
  .strict();
