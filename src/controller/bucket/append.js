const db = require('../../db');
const mongodb = require('mongodb');

module.exports = async (body, now) => {
  const { userId, productList, state } = body;
  const user = new mongodb.ObjectId(userId);
  const _id = new mongodb.ObjectId(body._id);
  const modelUser = await db.collections.users.findOne({ _id: user });
  if (!modelUser) {
    throw 'user is not found';
  }
  const bucketUserModel = await db.collections.bucket.findOne({ _id });
  if (bucketUserModel) {
    body.createdAt = bucketUserModel.createdAt;
    body.updatedAt = now;
    await db.collections.bucket.updateOne({ _id }, { $set: body });
    return {
      status: 200,
      data: {
        message: 'bucket appended'
      }
    };
  }
  console.log(body);

  await db.collections.bucket.insertOne({
    userId: user,
    productList,
    state,
    createdAt: now,
    updatedAt: now
  });
  return {
    status: 200,
    data: {
      message: 'bucket appended'
    }
  };
};
