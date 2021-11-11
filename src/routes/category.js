const express = require('express');
const { adminMiddleware, requireSignin } = require('../common-middleware');
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controllers/category');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      //cb(null, file.fieldname + '-' + Date.now())
      cb(null, shortid.generate() + '-' + file.originalname);
    }
  })
   
  var upload = multer({ storage: storage })




router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.post('/category/update', upload.single('categoryImage'), updateCategories);
router.get('/category/getCategories', getCategories);
router.post('/category/delete', deleteCategories);

module.exports = router;