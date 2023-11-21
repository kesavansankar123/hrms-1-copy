const leaveUsers = require('../modals/leave schema');
// const { format,parse }=require('date-fns')
const Joi = require('@hapi/joi');


// Controller function for GET /leave
const getLeaveUsers = async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

  try {
      const totalUsers = await leaveUsers.countDocuments();
      const totalPages = Math.ceil(totalUsers / perPage);

      const data = await leaveUsers
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

// Controller function for POST /leave/registration

const registerLeaveUser = async (req, res) => {   

    try {
      const schema = Joi.object({ Name:Joi.string().required(),Reason:Joi.string().required(),Start_Date: Joi.date().required(),End_Date:Joi.date().required()});
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      
      const { Name, Start_Date, End_Date, Reason } = req.body;

      const formattedStartDate = new Date(Start_Date).toLocaleDateString('en-GB');
      const formattedEndDate = new Date(End_Date).toLocaleDateString('en-GB');

      const newLeaveUser = new leaveUsers({ Name,Start_Date:formattedStartDate, End_Date:formattedEndDate, Reason });
      await newLeaveUser.save();

      res.status(200).send('Leave Added Sucessfully');
    } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const searchLeaveUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const key = req.params.key;

  const query = {
    $or: [
          { Name: { $regex: key, $options: "i" } },
          { Satrt_Date: { $regex: key, $options: "i" } },
          { End_Date: { $regex: key, $options: "i" } },
          { Reason: { $regex: key, $options: "i" } },
         
      // Add other fields here
    ]
  };

  try {
    const users = await leaveUsers
      .find(query).sort({Name:1})
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
        const users = await leaveUsers.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const updateLeaveUser = async (req, res) => {
    try {
      const users = await leaveUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!users) {
        return res.status(404).send( "User not found" );
      }
  
      return res.status(200).send("Leave is Updated successfully")
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const deleteLeaveUser = async (req, res) => {
    try {
      const users=await leaveUsers.findByIdAndDelete(req.params.id);
      if (!users) {
        return res.status(404).send("User not found" );
      }
  
      return res.status(200).send("Leave is Deleted successfully" )
    } catch (error) {
      res.status(500).send( error );
    }
  };

  module.exports = {
    getLeaveUsers,
    registerLeaveUser,
    searchLeaveUser,
    updateLeaveUser,
    deleteLeaveUser,
    getId
  };

// Define other controller functions for your routes
