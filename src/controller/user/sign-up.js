const mongodb = require('mongodb');
const db = require('../../db');
const security = require('../../helpers/security');

module.exports = async ({ body, headers, now }) => {
  const { email, password, first_name, last_name, phone } = body;
  const deviceId = headers['device-id'];

  if (!deviceId) {
    throw 'not valid parameter';
  }

  const userModel = await db.collections.users.findOne({ email });

  if (userModel) {
    throw 'email already used';
  }
  const us = await db.collections.users.findOne({ phone });

  if (us) {
    throw 'this phone already used';
  }
  const userId = new mongodb.ObjectId();
  const authorizationToken = security.generateSimpleToken();

  const hashedPass = await security.hash(password);
  await db.collections.session.insertOne({
    userId,
    deviceId,
    authorizationToken,
    createdAt: now,
    updatedAt: now
  });
  await db.collections.users.insertOne({
    email,
    createdAt: now,
    updatedAt: now,
    _id: userId,
    password: hashedPass,
    phone,
    first_name,
    last_name
  });
  return {
    status: 201,
    data: {
      authorizationToken,
      userId: userId.toString()
    }
  };
};
