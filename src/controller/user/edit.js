const mongodb = require('mongodb');
const db = require('../../db');

async function chek(body) {
  const user = await db.collections.user.findOne({ _id: body._id });
  for (item in body) {
    if (body[item] !== user[item]) {
      return true;
    }
  }
  return false;
}

module.exports = async (req) => {
  const { body, now, params } = req;
  if (!chek(body)) {
    throw 'Nothing has changed';
  }
  body.updatedAt = now;
  body._id = new mongodb.ObjectId(body._id);
  await db.collections.users.updateOne({ _id: body._id }, { $set: body });
};
