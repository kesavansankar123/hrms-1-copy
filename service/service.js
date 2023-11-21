 const express = require('express');
const attendanceRouter = require('../routers/attendance/attendnace router');
const leaveRouter =require("../routers/leave/leave router")
const trainingRouter =require("../routers/training/training router")
const timesheetRouter =require("../routers/timesheet/timesheet router")
const designationRouter =require("../routers/designation/designation router")
const userLogin =require("../routers/loginuser/loginuser router")
const shiftRouter =require("../routers/shift/shift router")
const all_employee=require("../routers/all emplyees/all employes router")
const client=require('../routers/client/client router')
const employee_tickets=require("../routers/employee tickets/employee tickets")
// const project =require("../routers/project/project router")
const promotion=require("../routers/promotion/promotion router.js")
const companySetting=require("../routers/company setting router.js/company router")

const app=express()

app.use('/attendance',attendanceRouter)
app.use('/leave',leaveRouter)
app.use('/training',trainingRouter)
app.use('/timesheet',timesheetRouter)
app.use('/designation',designationRouter)
app.use('/userlogin',userLogin)
app.use('/shift',shiftRouter)
app.use("/allemployee",all_employee)
app.use('/promotionemployee',promotion)
// app.use("/ProjectAllemployee",project)
app.use("/empolyeeTickets",employee_tickets)
app.use("/clients",client)
app.use("/companysetting",companySetting)


module.exports=app