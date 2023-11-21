const allemployee = require("../../modals/all-empolyeeSchema/allEmpolyeeSchema");
const bcrypt = require("bcrypt");
const allEmployee_Joi_schema = require("../../modals/all-empolyeeSchema/allEmoleeSchema_joi");

exports.allemployeeAdd=("/", async (req, res) => {
    try { 
        const { error } = allEmployee_Joi_schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { First_Name, last_Name, User_Name, email, password, Confirm_Password,Company, Employee_ID, Mobile_No, Department, Designation, Joining_Date } = req.body;

        const user = await allemployee.findOne({email}); 
        if(user){
            return res.status(400).send("Email Already Registered");
            
        }else{

            if (password !== Confirm_Password) {
                return res.status(400).send("Passwords do not match");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newEmployee = new allemployee({ 
                email,
                First_Name, // Corrected variable name
                last_Name,  // Corrected variable name
                User_Name,
                password: hashedPassword, // Store the hashed password
                Confirm_Password:hashedPassword,
                Employee_ID,
                Mobile_No,
                Department,
                Company,
                Designation,
                Joining_Date
            });

            // Use async/await for saving the user
            await newEmployee.save();
            
            res.status(200).send( "Employee Data Added Successfully" );
        }
    } catch (err) {
        console.error(err);
        res.status(400).send( err);
      }
});


