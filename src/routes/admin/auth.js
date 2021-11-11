const express = require('express');
const { requireSignin, adminMiddleware } = require('../../common-middleware');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');

const router = express.Router();


router.post('/admin/signup',validateSignupRequest, isRequestValidated, signup);

router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

router.get('/admin/signout', requireSignin, adminMiddleware, signout);

module.exports = router;