const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');

const allemployeeSchema = new Schema({
    First_Name: {
        type: String,
        required: true,
    },
    last_Name: {
        type: String,
        required: true,
    },
    User_Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    Confirm_Password: {
        type: String,
        required: true,
    },
    Company:{
        type: String,
        required: true, 
    },
    Employee_ID: {
        type: String,
        required: true,
    },
    Mobile_No: {
        type: Number,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    Designation: {
        type: String,
        required: true,
    },
    Joining_Date: {
        type: String,
        default: Date.now,
    },
});

const allemployee = mongoose.model('allemployee user', allemployeeSchema);

module.exports = allemployee;
