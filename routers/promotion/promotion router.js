const { promotionDelete } = require("../../controller/PromotionControllers/promotion-employee-deleted");
const { promotionAdd } = require("../../controller/PromotionControllers/promotion-employee-save");
const { promotionUpdated } = require("../../controller/PromotionControllers/promotion-employee-updated");
const { promotionList } = require("../../controller/PromotionControllers/promotion-employee-view");
const { promotionSearch,getId } = require("../../controller/PromotionControllers/promotion_employee_search");
const express = require('express');
const router = express.Router();
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")
const { roles } = require('../../utils/constants'); // Define your role constants



router.get('/:id', getId)
router.route('/').get(promotionList);
router.route('/registration').post(promotionAdd);
router.get("/data/:key", promotionSearch);
router.route('/update/:id').patch(promotionUpdated);
router.route('/delete/:id').delete(promotionDelete);



module.exports = router;
