const Joi = require('@hapi/joi');

module.exports = Joi.object()
  .keys({
    email: Joi.string().email(),
    password: Joi.string().min(8).max(16),
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone: Joi.string(),
    basket: Joi.array()
  })
  .strict();
