const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    Project_Name: {
        type: String,
        required: true,
    },
    Client: {
        type: String,
        required: true,
    },
    Priority: {
        type: String,
        required: true,
    },
    Add_Project_Leader: {
        type: String,
        required: true,
    },
    Team_Members: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Upload_File:{
            fileId:String,
            filename:String
        },
    Rate: {
        type: String,
        required: true,
    },
    Start_Date: {
        type: String,
        default: Date.now,
    },
    end_Date: {
        type: String,
        default: Date.now,
    }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
