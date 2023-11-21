const Joi = require("@hapi/joi");

const employeeTicketsJoiSchema = Joi.object({
  project: Joi.string().required(),
  ticket_id: Joi.string().required(),
  assign_to: Joi.string().required(),
  ticket_followers: Joi.string().required(),
  client: Joi.string().required(),
  priority: Joi.string().required(),
  status: Joi.string().required(),
  attachment: Joi.string().required(),
  description: Joi.string().required(),
  create_date: Joi.date(),
});

module.exports = employeeTicketsJoiSchema;
