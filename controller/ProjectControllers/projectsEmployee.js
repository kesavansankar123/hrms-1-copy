const ProjectsdeletedRouter = require("./projects-employee-deleted");
const ProjectsAddRouter = require("./projects-employee-save");
const ProjectsUpdateRouter = require("./projects-employee-updated");
const ProjectsviewRouter = require("./projects-employee-view");
const ProjectsSearchRouter = require("./projects_empolyee_search");
const ProjectAllemployee = require("express").Router();




ProjectAllemployee.use("/projects-employee-save",ProjectsAddRouter)
ProjectAllemployee.use("/projects-employee-deleted",ProjectsdeletedRouter)
ProjectAllemployee.use("/projects-employee-Updated",ProjectsUpdateRouter)
ProjectAllemployee.use("/",ProjectsviewRouter)
ProjectAllemployee.use("/projects-employee-search",ProjectsSearchRouter)




module.exports=ProjectAllemployee;