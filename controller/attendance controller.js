const attendanceUsers = require('../modals/attendance schema');
const Joi = require('@hapi/joi');

// Controller functions
const getAllAttendance = async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

  try {
      const totalUsers = await attendanceUsers.countDocuments();
      const totalPages = Math.ceil(totalUsers / perPage);

      const data = await attendanceUsers
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


const createAttendance = async (req, res) => {
  try {
    const schema = Joi.object({ Name:Joi.string().required(),
      Team:Joi.string().required(),
      EDate: Joi.date(),
      Punch_In:Joi.string().required(),
      Punch_Out: Joi.string().required(),
      Production: Joi.string().required(),
      Break_Time: Joi.string().required(),
      Over_Time: Joi.string().required(),


    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { Name, Team, EDate, Punch_In, Punch_Out, Production, Break_Time, Over_Time } = req.body;
    const formattedDate = new Date(EDate).toLocaleDateString('en-GB');

    const newuser = new attendanceUsers({ Name, Team, Date:formattedDate, Punch_In, Punch_Out, Production, Break_Time, Over_Time });
    await newuser.save();
    res.status(200).send('Attendance Added Successfully');
  } catch (err) {
    res.status(400).send('error: ' + err);
  }
};

const searchAttendance = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const key = req.params.key;

  const query = {
    $or: [
      { Name: { $regex: key, $options: "i" } },
      { Team: { $regex: key, $options: "i" } },
      { Date: { $regex: key, $options: "i" } },
      { Punch_In: { $regex: key, $options: "i" } },
      { Punch_Out: { $regex: key, $options: "i" } },

      // Add other fields here
    ]
  };

  try {
    const users = await attendanceUsers
      .find(query)
      .sort({ Name: 1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

      if (users && users.length > 0) {
        res.status(200).send(users);
      } else {
        res.status(400).send("No Users");
      }  
    } catch (err) {
    res.status(500).send(err);
  }
};

const getId = async (req, res) => {
  const {id}=req.params
  try {
      const users = await attendanceUsers.findById(id)
          if (users) {
            res.status(200).send(users);
          } else {
            res.status(400).send("No Users"); 
          }  
        } catch (err) {
      res.status(400).send('error: ' + err);
  }
};

const updateAttendance = async (req, res) => {
  try {
    const users = await attendanceUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!users) {
      return res.status(404).send( "User not found" );
    }
    res.status(200).send( "Attendance Data Updated Successfully ");
  } catch (error) {
    res.status(500).send( error);
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const users=await attendanceUsers.findByIdAndDelete(req.params.id);
    if (!users) {
      return res.status(404).send("User not found" );
    }

    return res.status(200).send(" Attendance Data Deleted successfully" );
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllAttendance,
  createAttendance,
  searchAttendance,
  updateAttendance,
  deleteAttendance,
  getId
};
