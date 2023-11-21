const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('@hapi/joi');




const promotionSchema = new Schema({
        promotion_employee: joi.string().required(),
        department: joi.string().required(),
        promotion_from: { 
            type: String,
            require:true
        },
        promotion_to: { 
            type: String,
            require:true
        },
        promotion_date:{
            type: String,
            require:true

        }
       
});
const promotion = mongoose.model('promotion new ', promotionSchema);
module.exports = promotion;