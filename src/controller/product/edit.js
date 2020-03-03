const mongodb = require('mongodb');

const db = require('../../db');

async function chekBody(body) {
  const oldProduct = await db.collections.products.findOne({ _id: body._id });
  if (!oldProduct) {
    throw 'Product not find';
  }
  console.log(body.category);
  if (body.category.length != oldProduct.category.length) {
    return true;
  } else {
    for (let i = 0; i < body.category.length; i++) {
      if (body.category[i] !== oldProduct.category[i]) {
        return true;
      }
    }
  }
  for (item in oldProduct) {
    if (oldProduct[item] !== body[item]) {
      return true;
    }
  }

  return false;
}

module.exports = async (body, now, _id) => {
  body._id = new mongodb.ObjectId(_id);
  if (!await chekBody(body)) {
    throw 'Nothing has changed';
  }
  body.updatedAt = now;
  await db.collections.products.updateOne({ _id: body._id }, { $set: body });

  return {
    status: 200,
    data: {
      message: 'Susccess edited'
    }
  };
};
