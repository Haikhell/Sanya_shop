const validator = require('../helpers/valitator');

module.exports.schemas = validator.schemas;

module.exports.middleware = (schema) => (req, res, next) => {
  try {
    const body = req.body;
    const { error } = validator.validate(body, schema);
    if (error) {
      throw 'validator Error';
    }
    next();
  } catch (error) {
    next(error);
  }
};
