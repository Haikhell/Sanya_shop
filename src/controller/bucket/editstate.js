const db = require('../../db');
const mongodb = require('mongodb');

module.exports = async (body) => {
  const _id = new mongodb.ObjectId(body._id);
  const bucketModel = await db.collections.bucket.findOne({ _id });
  if (!bucketModel) {
    throw 'bucket not defiend';
  }
  await db.collections.bucket.updateOne({ _id }, { $set: body });
  return {
    status: 200,
    data: {
      message: 'state edited'
    }
  };
};
