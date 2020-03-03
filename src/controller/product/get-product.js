const mongodb = require('mongodb');

const db = require('../../db');

module.exports = async (productId) => {
  const _id = new mongodb.ObjectId(productId);
  if (productId) {
    const products = await db.collections.products.findOne({ _id });
    return {
      status: 200,
      data: products
    };
  }
  const products = await db.collections.products.find({}).toArray();
  return {
    status: 200,
    data: products
  };
};
