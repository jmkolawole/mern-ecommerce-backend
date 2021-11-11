const express = require('express');
const { requireSignin } = require('../common-middleware');
const { signup, signin, signout } = require('../controllers/auth');
const router = express.Router();
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../validators/auth');



router.post('/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.get('/signout', requireSignin,signout);

module.exports = router;