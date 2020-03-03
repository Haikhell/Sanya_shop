const db = require('../../db');
const mongodb = require('mongodb');

module.exports = async (body) => {
  const { userId } = body;
  const user = new mongodb.ObjectId(userId);
  const bucketModel = await db.collections.bucket.findOne({ userId: user });
  if (!bucketModel) {
    throw 'bucket not found';
  }
  return {
    status: 200,
    data: {
      bucketModel
    }
  };
};
