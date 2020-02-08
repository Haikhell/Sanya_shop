const mongodb = require('mongodb');

module.exports = (...parametrs) => (req, res, next) => {
  try {
    const params = req.params;
    parametrs.forEach((parametr) => {
      if (params.hasOwnProperty(parametr) || !mongodb.ObjectId.isValid(params[parametr])) {
        throw 'not valid parametrs';
      }
    });
    next();
  } catch (error) {
    next(error);
  }
};
