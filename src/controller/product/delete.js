const db = require('../../db');
module.exports = async (params) => {
  await db.collections.product.deleteOne({ _id: params._id });
  return { status: 200, data: { message: 'Success deleted product' } };
};
