module.exports = (docs, asyncFunction) => {
  return Promise.all(docs.map(asyncFunction));
};
