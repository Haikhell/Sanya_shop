const db = require('../../db');

module.exports = async (body, now) => {
  const { title, price, country, category, description, photoPath, inStock } = body;
  await db.collections.products.insertOne({
    title,
    price,
    country,
    category,
    description,
    photoPath,
    inStock,
    updatedAt: now,
    createdAt: now
  });
  return { status: 201, data: { message: ' Created' } };
};
