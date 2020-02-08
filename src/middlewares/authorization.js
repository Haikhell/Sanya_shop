const CONSTANTS = require('../const');

module.exports = (opts = {}) => async (req, res, next) => {
  try {
    const { headers: { 'device-id': deviceId, authorization: authorizationToken } } = req;

    const db = req[CONSTANTS.REQUEST.DATA].db;

    const session = await db.collections.session.findOne({ deviceId, authorizationToken });

    if (!session) {
      throw 'no auth token';
    }

    req[CONSTANTS.REQUEST.DATA].authorized = true;
    req[CONSTANTS.REQUEST.DATA].deviceId = deviceId;
    req[CONSTANTS.REQUEST.DATA].authorizationToken = authorizationToken;

    req[CONSTANTS.REQUEST.DATA].userId = session.userId;
    req[CONSTANTS.REQUEST.DATA].userIdString = session.userId.toString();

    if (opts.attachUserAccount) {
      const userModel = await db.collections.users.findOne({ _id: session.userId });

      if (!userModel) {
        throw 'not found user';
      }
      req[CONSTANTS.REQUEST.DATA].userModel = userModel;
    }
    next();
  } catch (err) {
    next(err);
  }
};
