const companySetting = require('../modals/company setting schema');
const Joi=require("@hapi/joi")

// Controller functions
const getAllcompanySetting =async (req, res) => {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1

  try {
      const totalUsers = await companySetting.countDocuments();
      const totalPages = Math.ceil(totalUsers / perPage);

      const data = await companySetting
          .find()
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

const createcompanySetting = async (req, res) => {
 try {
    const schema = Joi.object({ Email: Joi.string().email().required(),Company_Name:Joi.string().required(),Contact_person:Joi.string().required(), Address:Joi.string().required(), Country:Joi.string().required(), City:Joi.string().required(), State:Joi.string().required(), Postal_Code:Joi.number().required(), Phone_Number:Joi.number().required(),Mobile_Number:Joi.number().required(),Fax:Joi.required().required(),Website_Url:Joi.required().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { Company_Name, Contact_person, Address, Country, City, State, Postal_Code, Phone_Number,Mobile_Number,Fax,Website_Url } = req.body;

    const user = await loginUsers.findOne({Email});     
        
    if(!user){
      res.status(400).send('User Already Registered');

    }else{

      const newuser = new companySetting({ Company_Name, Contact_person, Address, Country, City, State, Postal_Code, Phone_Number,Mobile_Number,Fax,Website_Url });
      await newuser.save();
      res.status(200).send('Company Data Added Successfully');
    }
  } catch (err) {
    res.status(400).send('error: ' + err);
  }
};

const searchcompanySetting = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const key = req.params.key;

  const query = {
    $or: [
      { Company_Name: { $regex: key, $options: "i" } },
      { Contact_person: { $regex: key, $options: "i" } },
      { Address: { $regex: key, $options: "i" } },
      { Country: { $regex: key, $options: "i" } },
      { City: { $regex: key, $options: "i" } },
      { State: { $regex: key, $options: "i" } },
      { Postal_Code: isNaN(numericKey) ? { $regex: key, $options: "i" } : numericKey },
      { Phone_Number: isNaN(numericKey) ? { $regex: key, $options: "i" } : numericKey },
      { Mobile_Number: isNaN(numericKey) ? { $regex: key, $options: "i" } : numericKey },


      // Add other fields here
    ]
  };

  try {
    const users = await companySetting
      .find(query)
      .sort({ _id: -1 })
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
      const users = await companySetting.findById(id)
          if (users) {
            res.status(200).send(users);
          } else {
            res.status(400).send("No Users"); 
          }  
        } catch (err) {
      res.status(400).send('error: ' + err);
  }
};

const updatecompanySetting = async (req, res) => {
  try {
    const users = await companySetting.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!users) {
      return res.status(404).send( "User not found" );
    }
    res.status(200).send( "Company Data Updated Successfully ");
  } catch (error) {
    res.status(500).send( error);
  }
};

const deletecompanySetting = async (req, res) => {
  try {
    const users=await companySetting.findByIdAndDelete(req.params.id);
    if (!users) {
      return res.status(404).send("User not found" );
    }

    return res.status(200).send(" Company Data Deleted successfully" );
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllcompanySetting,
  createcompanySetting,
  searchcompanySetting,
  updatecompanySetting,
  deletecompanySetting,
  getId
};
