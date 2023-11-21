const Joi = require("@hapi/joi");

const Emp_projectsSchema_joi = Joi.object({
    Project_Name: Joi.string().required(),
    Client:Joi.string().required(),
    Priority:Joi.string().required(),
    Add_Project_Leader:Joi.string().required(),
    Team_Members:Joi.string().required(),
    Description:Joi.string().required(),
    Rate:Joi.number().required(),
    Upload_File:Joi.string(),
    Start_Date:Joi.date() .raw().less("now"),
    end_Date:Joi.date().raw().less("now").min(Joi.ref("Start_Date")).allow(null)
  });

  module.exports=Emp_projectsSchema_joi;