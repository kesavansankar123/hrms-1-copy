const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');



const EmpolyeeTicketsSchema = new Schema({
    project: {
        type: String,
        required: true,
    },
    ticket_id: {
        type: String,
        required: true,
    },
    assign_to: {
        type: String,
        required: true,
    },
    ticket_followers: {
        type: String,
        required: true,
    },
    client: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },

    attachment: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    create_date: {
        type: Date,
        default: Date.now,
    },

});

const EmpolyeeTickets = mongoose.model('EmpolyeeTickets new user', EmpolyeeTicketsSchema);

module.exports = EmpolyeeTickets;