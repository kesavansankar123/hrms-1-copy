

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    Designation_Name:{
        type:String,
        required:true,
    },
    Department:{
        type:String,
        required:true,   
    },
    
    
   
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('designation',userSchema)

module.exports=loginUsers;