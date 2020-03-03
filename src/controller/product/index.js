const routesWrapper = require('../../helpers/routes-wrapper');

const create = require('./create');
const deletes = require('./delete');
const edit = require('./edit');
const getProduct = require('./get-product');

module.exports = { create, deletes, edit, getProduct };
