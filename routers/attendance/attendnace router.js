const express = require('express');
const router = express.Router();
const attendanceController = require('../../controller/attendance controller');
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")
const { roles } = require('../../utils/constants'); // Define your role constants

// authenticateUser, checkUserRole(roles.employee)

router.get('/',attendanceController.getAllAttendance);
router.post('/registration' ,attendanceController.createAttendance);
router.get("/:id", attendanceController.getId);
router.get("/data/:key", attendanceController.searchAttendance);
router.patch('/update/:id',attendanceController.updateAttendance);
router.delete('/delete/:id',attendanceController.deleteAttendance);

module.exports = router;
