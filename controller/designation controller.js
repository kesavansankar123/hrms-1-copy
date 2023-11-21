const designationUsers = require('../modals/designation schema');

// Controller function for GET /designations
const getDesignations = async (req, res) => {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

    try {
        const totalUsers = await designationUsers.countDocuments();
        const totalPages = Math.ceil(totalUsers / perPage);

        const users = await designationUsers
            .find()
            .sort({ _id: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);

        if (users && users.length > 0) {
            res.status(200).send({
                users,
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


// Controller function for POST /designations/registration
const registerDesignation = async (req, res) => {
    const { Designation_Name, Department } = req.body;

    try {
        const newuser = new designationUsers({ Designation_Name, Department });
        await newuser.save();
        res.status(200).send('Designation Added Successfully');
    } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const searchDesignation = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const key = req.params.key;
  
    const query = {
      $or: [
        { Designation_Name: { $regex: key, $options: "i" } },
        { Department: { $regex: key, $options: "i" } },
        // Add other fields here
      ]
    };
  
    try {
      const users = await designationUsers
        .find(query)
        .sort({ Designation_Name: 1 })
        .skip((page - 1) * perPage)
        .limit(perPage);
  
        if (users && users.length > 0) {
          res.status(200).send(users);
        } else {
          res.status(400).send("No Users");
        }
    } catch (err) {
      res.status(500).send(err );
    }
  };

  const getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await designationUsers.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};

const updateDesignation = async (req, res) => {
    try {
      const users = await designationUsers.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!users) {
        return res.status(400).send("User not found" );
      }
  
      return res.status(200).send( "Designation is Updated successfully" )
    } catch (error) {
      res.status(500).send( error);
    }
  };
  
  const deleteDesignation = async (req, res) => {
    try {
      const users=await designationUsers.findByIdAndDelete(req.params.id);
      if (!users) {
        return res.status(400).send("User not found" );
      }
  
      return res.status(200).send("Designation is deleted successfully" )
    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = {
    getDesignations,
    registerDesignation,
    searchDesignation,
    updateDesignation,
    deleteDesignation,
    getId
  };
// Define other controller functions for your routes
