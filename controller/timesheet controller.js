const timesheetUsers = require('../modals/timesheet schema');
const Joi = require('@hapi/joi');

// Controller function for GET /timesheet
const getTimesheetUsers = async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

  try {
      const totalUsers = await timesheetUsers.countDocuments();
      const totalPages = Math.ceil(totalUsers / perPage);

      const data = await timesheetUsers
          .find()
          .sort({ _id: -1 })
          .skip((page - 1) * perPage)
          .limit(perPage);

      if (data && data.length > 0) {
          res.status(200).send({
              data,
              totalPages:totalPages,
              currentPage: page,
          });
      } else {
          res.status(400).send("No Users");
      }
  } catch (err) {
      res.status(500).send('Error: ' + err);
  }
};


// Controller function for POST /timesheet/registration
const registerTimesheetUser = async (req, res) => {
     try {
      const schema = Joi.object({ Project_Name:Joi.string().required(),Deadline:Joi.string().required(),Date: Joi.date().required(),Total_Hours:Joi.date().required(),Remaining_Hours:Joi.string().required(),Hours:Joi.string().required(),Discription:Joi.string().required()});
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error);

      const {
        Project_Name,
        Deadline,
        Date,
        Total_Hours,
        Remaining_Hours,
        Hours,
        Discription
    } = req.body;

    const formatteDate = new Date(Date).toLocaleDateString('en-GB');

        const newTimesheetUser = new timesheetUsers({
            Project_Name,
            Deadline,
            Date:formatteDate,
            Total_Hours,
            Remaining_Hours,
            Hours,
            Discription
        });

        await newTimesheetUser.save();
        res.status(200).send('Added Timesheet Details ');
    } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const searchTimesheetUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const key = req.params.key;
  
    const query = {
      $or: [
            { Project_Name: { $regex: key, $options: "i" } },
            { Deadline: { $regex: key, $options: "i" } },
            { Date: { $regex: key, $options: "i" } },
            { Total_Hours: { $regex: key, $options: "i" } },
            { Hours: { $regex: key, $options: "i" } },
            { Remaining_Hours: { $regex: key, $options: "i" } },
            { Discription: { $regex: key, $options: "i" } },
        // Add other fields here
      ]
    };
  
    try {
      const users = await timesheetUsers
        .find(query).sort({Project_Name:1})
        .skip((page - 1) * perPage)
        .limit(perPage);
  
        if (users && users.length > 0) {
          res.status(200).send(users);
        } else {
          res.status(400).send("No Users");
        }
      } catch (err) {
      res.status(500).send( err);
    }
  };


  const getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await timesheetUsers.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const updateTimesheetUser = async (req, res) => {
    try {
      const users = await timesheetUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!users) {
        return res.status(404).send("User not found" );
      }
  
      return res.status(200).send("Timesheet is Updated successfully" )
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const deleteTimesheetUser = async (req, res) => {
    try {
      const users=await timesheetUsers.findByIdAndDelete(req.params.id);
      if (!users) {
        return res.status(404).send("User not found" );
      }
  
      return res.status(200).send("Timesheet is Deleted successfully" )
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {
    getTimesheetUsers,
    registerTimesheetUser,
    searchTimesheetUser,
    updateTimesheetUser,
    deleteTimesheetUser,
    getId
  };


// Define other controller functions for your routes
 