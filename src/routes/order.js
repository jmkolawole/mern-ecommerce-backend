const router = require("express").Router();

const { requireSignin, userMiddleware, adminMiddleware } = require("../common-middleware");
const { addOrder, getOrders, getOrder} = require("../controllers/order");
const {updateOrder, getCustomerOrders} = require("../controllers/admin/order")

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);
router.post("/order/update", requireSignin, adminMiddleware, updateOrder);
router.get("/order/getCustomerOrders", requireSignin, adminMiddleware, getCustomerOrders);
module.exports = router;


