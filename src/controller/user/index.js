const routesWrapper = require('../../helpers/routes-wrapper');

const signIn = require('./sign-in');
const signUp = require('./sign-up');
const edit = require('./edit');
const getProfile = require('./get-profile');
const endpoints = { signIn, signUp, edit, getProfile };

module.exports = { endpoints, routes: routesWrapper(endpoints) };
