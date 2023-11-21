

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    
    Name:{
        type:String,
        required:true,
    },
    Team:{
        type:String,
        required:true,   
    },
    Date:{
        type:Date,
        required:true,
    },
    Punch_In:{
        type:String,
        required:true,
    },
    Punch_Out :{
        type:String,
        required:true,
    },
    Production:{
        type:String,
        required:true,
    },
    Break_Time:{
        type:String,
        required:true
    },
    Over_Time:{
        type:String,
        required:true
    },

   
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('Attendance',userSchema)

module.exports=loginUsers;