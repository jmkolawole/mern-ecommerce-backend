const express = require('express');
const { adminMiddleware, requireSignin, upload } = require('../common-middleware');
const { createProduct, getProductsBySlug, getProductDetailsById} = require('../controllers/product');
const router = express.Router();



router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPictures'), createProduct);
router.get('/products/:slug', getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);

module.exports = router;