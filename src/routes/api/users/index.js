const express = require('express');

const user = require('../../../controller/user');
const { schemas: validationSchemas, middleware: validate } = require('../../../middlewares/validate');

const authorization = require('../../../middlewares/authorization');

const router = express.Router();

router.get('/user', authorization(), user.routes.getProfile);

router.post('/signin', validate(validationSchemas.user.signIn), user.routes.signIn);

router.post('/signup', validate(validationSchemas.user.signUp), user.routes.signUp);

router.post('/editprofile', validate(validationSchemas.user.edit), user.routes.edit);

module.exports = router;
