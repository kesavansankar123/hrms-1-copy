const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ClientsSchema = new Schema({
    client_name: {
        type: String,
        required: true,
    },
    client_email: {
        unique: true,
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    client_company: {
        type: Number,
        required: true,
    },
    client_mobilenumber: {
        type: String,
        required: true,
    },
    client_address: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        default: Date.now,
    },
 


});

const Clients = mongoose.model('Clients new user', ClientsSchema);

module.exports = Clients;