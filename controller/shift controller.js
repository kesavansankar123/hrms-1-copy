const shiftUsers = require('../modals/shift schema');
const Joi = require('@hapi/joi');

// Controller function for GET /shift
const getShiftUsers = async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

  try {
      const totalUsers = await shiftUsers.countDocuments();
      const totalPages = Math.ceil(totalUsers / perPage);

      const data = await shiftUsers
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
// Controller function for POST /shift/registration
const registerShiftUser = async (req, res) => {
    const {
        Shift_Name,
        Min_Start_Time,
        Start_Time,
        Max_Start_Time,
        Min_End_Time,
        End_Time,
        Max_End_Time,
        Break_Time,
        Repeat_Every,
        Weeks,
        End_On,
        Add_Tag,
        Add_Note
    } = req.body;

    try {
        const newShiftUser = new shiftUsers({
            Shift_Name,
            Min_Start_Time,
            Start_Time,
            Max_Start_Time,
            Min_End_Time,
            End_Time,
            Max_End_Time,
            Break_Time,
            Repeat_Every,
            Weeks,
            End_On,
            Add_Tag,
            Add_Note
        });

        await newShiftUser.save();
        res.status(200).send('Shift Added Successfully');
    } catch (err) {
        res.status(400).send('error: ' + err);
    }
};


const searchShiftUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const key = req.params.key;
  
    const query = {
      $or: [
        { Shift_Name: { $regex: key, $options: "i" } },
        { Min_Start_Time: { $regex: key, $options: "i" } },
        { Start_Time: { $regex: key, $options: "i" } },
        { Max_Start_Time: { $regex: key, $options: "i" } },
        { Min_End_Time: { $regex: key, $options: "i" } },
        { End_Time: { $regex: key, $options: "i" } },
        { Max_End_Time: { $regex: key, $options: "i" } },
        { Break_Time: { $regex: key, $options: "i" } },
        { Repeat_Everyson: { $regex: key, $options: "i" } },
        { Weeks: { $regex: key, $options: "i" } },
        { End_On: { $regex: key, $options: "i" } },
        { Add_Tag: { $regex: key, $options: "i" } },
        { Add_Note: { $regex: key, $options: "i" } },

        // Add other fields here
      ]
    };
  
    try {
      const users = await shiftUsers
        .find(query)
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
        const users = await shiftUsers.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const updateShiftUser = async (req, res) => {
    try {
      const users = await shiftUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!users) {
        return res.status(404).send("User not found" );
      }
  
      return res.status(200).send("Shift is Updated successfully" )
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const deleteShiftUser = async (req, res) => {
    try {
      const users=await shiftUsers.findByIdAndDelete(req.params.id);
      if (!users) {
        return res.status(404).send("User not found" );
      }
  
      return res.status(200).send("Shift is Deleted successfully" )
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {
    getShiftUsers,
    registerShiftUser,
    searchShiftUser,
    updateShiftUser,
    deleteShiftUser,
    getId
  };

// Define other controller functions for your routes

// Define other controller functions for your routes
