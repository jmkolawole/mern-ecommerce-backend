const express = require('express');
const { adminMiddleware, requireSignin } = require('../../common-middleware');
const { initialData } = require('../../controllers/admin/initialData');
const router = express.Router();
router.get('/initial-data', requireSignin, adminMiddleware, initialData);



module.exports = router;