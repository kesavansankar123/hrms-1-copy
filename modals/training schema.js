

const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    Training_Type:{
        type:String,
        required:true,
    },
    Employee:{
        type:String,
        required:true,   
    },
    Trainer:{
        type:String,
        required:true,
    },
    Start_Date :{
        type:String,
        required:true,
    },
    End_Date:{
        type:String,
        required:true
    },
    Discription:{
        type:String,
        required:true,
    },
    Training_Cost:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        required:true

    }
   
},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('Training',userSchema)

module.exports=loginUsers;