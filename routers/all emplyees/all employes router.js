const { allemployeeDelete } = require("../../controller/All-empolyee/all-employee-deleted");
const { allemployeeSearch,getId } = require("../../controller/All-empolyee/all-employee-search");
const { allemployeeUpadated } = require("../../controller/All-empolyee/all-employee-upadated");
const { allemployeeList } = require("../../controller/All-empolyee/all-employee.view");
const { allemployeeAdd } = require("../../controller/All-empolyee/all-empolyee-save");
const express = require('express');
const router = express.Router();
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")
const { roles } = require('../../utils/constants'); // Define your role constants



router.post('/registration',allemployeeAdd)
router.get('/',allemployeeList)
router.delete('/delete/:id',allemployeeDelete)
router.get('/data/:key',allemployeeSearch)
router.get('/:id',getId)
router.patch('/update/:id',allemployeeUpadated)

module.exports = router;
