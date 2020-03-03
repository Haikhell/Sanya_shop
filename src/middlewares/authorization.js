const db = require('../db');
const CONSTANTS = require('../const');

module.exports = (opts = {}) => async (req, res, next) => {
  try {
    const { headers: { 'device-id': deviceId, 'authorization-token': authorizationToken } } = req;
    console.log(req[CONSTANTS.REQUEST.DATA]);
    if (!req[CONSTANTS.REQUEST.DATA]) {
      req[CONSTANTS.REQUEST.DATA] = {};
    }

    const session = await db.collections.session.findOne({ deviceId, authorizationToken });
    if (!session) {
      if (opts.notNecessaryAuth) {
        req[CONSTANTS.REQUEST.DATA].authorized = false;
        return next();
      }

      throw 'user no session';
    }

    // set session information
    req[CONSTANTS.REQUEST.DATA].authorized = true;
    req[CONSTANTS.REQUEST.DATA].deviceId = deviceId;
    req[CONSTANTS.REQUEST.DATA].authorizationToken = authorizationToken;

    // save userId
    req[CONSTANTS.REQUEST.DATA].userId = session.userId;
    req[CONSTANTS.REQUEST.DATA].userIdString = session.userId.toString();

    if (opts.attachUserAccount) {
      const userModel = await db.collections.users.findOne({ _id: session.userId });

      if (!userModel) {
        throw 'user not found';
      }

      req[CONSTANTS.REQUEST.DATA].userModel = userModel;
    }

    next();
  } catch (err) {
    next(err);
  }
};
