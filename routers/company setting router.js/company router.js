const express = require('express');
const router = express.Router();
const companyController = require('../../controller/company setting controller');
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")
const { roles } = require('../../utils/constants'); // Define your role constants

// authenticateUser, checkUserRole(roles.employee)

router.get('/',companyController.getAllcompanySetting);
router.post('/registration' ,companyController.createcompanySetting);
router.get("/:id", companyController.getId);
router.get("/data/:key", companyController.searchcompanySetting);
router.patch('/update/:id',companyController.updatecompanySetting);
router.delete('/delete/:id',companyController.deletecompanySetting);

module.exports = router;
