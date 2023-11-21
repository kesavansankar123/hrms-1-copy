const Joi = require("@hapi/joi");

const Clients_joi = Joi.object({
  client_name: Joi.string().required(),
  client_email: Joi.string().email().required(),
  client_company: Joi.string().required(),
  client_mobilenumber: Joi.number().required(),
  client_address: Joi.string().required(),
  date: Joi.string(),
  
});

module.exports = Clients_joi;
