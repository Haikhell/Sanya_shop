const Joi = require('@hapi/joi');

const schemas = require('./schemas');

module.exports.Joi = Joi;
module.exports.schemas = schemas;
module.exports.validate = (obj, schema) => schema.validate(obj);
