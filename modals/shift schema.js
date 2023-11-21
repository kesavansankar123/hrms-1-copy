

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    Shift_Name:{
        type:String,
        required:true,
    },
    Min_Start_Time:{
        type:String,
        required:true,   
    },
    Start_Time:{
        type:String,
        required:true
    },
    
    Max_Start_Time:{
        type:String,
        required:true,
    },
    Min_End_Time :{
        type:String,
        required:true,
    },
   
    End_Time:{
        type:String,
        required:true,
    },
    Max_End_Time:{
        type:String,
        required:true
    },
    Break_Time:{
        type:String,
        required:true
    },
    Repeat_Every:{
        type:String,
        required:true
    },
    Weeks:{
        type:String,
        required:true
    },
    End_On:{
        type:String,
        required:true
    },
    Add_Tag:{
        type:String,
        required:true
    },
    Add_Note:{
        type:String,
        required:true
    },
    
    

    
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('Shift',userSchema)

module.exports=loginUsers;