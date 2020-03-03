const security = require('../../helpers/security');
const db = require('../../db');

module.exports = async ({ body, headers, now }) => {
  const { email, password } = body;
  const deviceId = headers.deviceid;

  if (!deviceId) {
    throw 'not valid device id';
  }

  const userModel = await db.collections.users.findOne({ email });
  if (!userModel) {
    throw 'not found user';
  }

  const passworIsEqual = await security.compare(password, userModel.password);
  if (!passworIsEqual) {
    throw 'not valid password';
  }

  const userId = userModel._id;

  const sessionModel = await db.collections.session.findOne({ deviceId, userId });

  const authorizationToken = security.generateSimpleToken();
  const update = { authorizationToken, updatedAt: now };
  if (!sessionModel) {
    update.createdAt = now;
  }
  update.deviceId = deviceId;
  update.userId = userId;
  console.log(update);

  await db.collections.session.updateOne(
    {
      deviceId,
      userId
    },
    {
      $set: update
    },
    {
      upsert: true
    }
  );
  return {
    status: 200,
    data: {
      authorizationToken,
      userId: userId.toString()
    }
  };
};
