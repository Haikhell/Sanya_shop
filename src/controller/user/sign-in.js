const security = require('../../helpers/security');

module.exports = async ({ db, body, headers, now }) => {
  const { email, password } = body;
  const deviceId = [ 'device-id' ];
  if (!deviceId) {
    throw 'not valid device id';
  }

  const userModel = await db.collections.users.findOne({ email });

  if (!userModel) {
    throw 'not found user';
  }

  const passworIsEqual = await security.compare(password, userModel.password);

  if (!passworIsEqual) {
    throw 'not found user';
  }

  const userId = userModel._id;

  const sessionModel = await db.collections.session.findOne({ deviceId, userId });

  const autorizationToken = security.generateSimpleToken();
  const update = { autorizationToken, updatedAt: now };
  if (!sessionModel) {
    update.createAt = now;
  }

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
      autorizationToken,
      userId: userId.toString()
    }
  };
};
