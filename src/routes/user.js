const express = require('express');

const user = require('../controller/user');
const { validate } = require('../middlewares');

const validator = require('../helpers/valitator');

const router = express.Router();

router.post('/signIn', validate(validator.schemas.user.signIn), user.routes.signIn);

router.post('/signUp', validate(validator.schemas.user.signUp), user.routes.signUp);
module.exports = router;
