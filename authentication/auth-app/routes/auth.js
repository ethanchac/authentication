const express = require('express');
const router = express.Router();

const signupRoute = require('./Signup');
const loginRoute = require('./Login');

router.use('/', signupRoute);
router.use('/', loginRoute);

module.exports = router;
