

const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const { roles } = require('../utils/constants'); // Define your role constants


const userSchema = new Schema({    
    Email:{
        unique :true,  
        type :String, 
        lowercase:true,    
        required : true   

    },
    Password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:[roles.admin,roles.hr,roles.employee],
        default:roles.employee 
    }

    
   
})

const loginUsers= mongoose.model('loginUser',userSchema)

module.exports=loginUsers;