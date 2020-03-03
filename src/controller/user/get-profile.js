const db = require('../../db');

module.exports = async (userId) => {
  const user = await db.collections.users.findOne({ _id: userId });
  if (!user) {
    throw 'user not found';
  }
  return {
    status: 200,
    data: user
  };
};
