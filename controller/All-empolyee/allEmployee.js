const allemployeedeletedRouter = require("./all-employee-deleted");
const allemployeesearchRouter = require("./all-employee-search");
const allemployeeUpdateRouter = require("./all-employee-upadated");
const allemployeeviewRouter = require("./all-employee.view");
const allEmpolyeeAddRouter = require("./all-empolyee-save");

const allemployeeRouter = require("express").Router();




allemployeeRouter.use("/all-empolyee-save",allEmpolyeeAddRouter)
allemployeeRouter.use("/all-empolyee-deleted",allemployeedeletedRouter)
allemployeeRouter.use("/all-empolyee-Update",allemployeeUpdateRouter)
allemployeeRouter.use("/",allemployeeviewRouter)
allemployeeRouter.use("/all-empolyee-search",allemployeesearchRouter)




module.exports=allemployeeRouter;