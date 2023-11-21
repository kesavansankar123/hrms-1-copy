

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    
    Company_Name:{
        type:String,
        required:true,
    },
    Contact_Person:{
        type:String,
        required:true,   
    },
    Address:{
        type:String,
        required:true,
    },
    Country:{
        type:String,
        required:true,
    },
    State :{
        type:String,
        required:true,
    },
    Postal_Code:{
        type:Number,
        required:true,
    },
    Email:{
        unique:true,
        type:String,
        required:true
    },
    Phone_number:{
        type:Number,
        required:true
    },
    Mobile_Number:{
        type:Number,
        required:true
    },
    Fax:{
        type:String,
        required:true
    },
    Website_Url:{
        type:String,
        required:true
    },
    
   
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('Company_Setting',userSchema)

module.exports=loginUsers;