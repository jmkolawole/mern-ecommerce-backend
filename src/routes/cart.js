const express = require('express');
const { userMiddleware, requireSignin } = require('../common-middleware');
const { addItemToCart, getCartItems } = require('../controllers/cart');
const router = express.Router()


router.post('/user/cart/add-to-cart', requireSignin, userMiddleware, addItemToCart);

router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);
//router.get('/category/getCategories', getCategories);

module.exports = router;