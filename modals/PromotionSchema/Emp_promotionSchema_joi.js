const Joi = require("@hapi/joi");

const Emp_promotionSchema_joi = Joi.object({
    promotion_employee: Joi.string().required(),
    department:Joi.string().required(),
    promotion_from:Joi.string().required(),
    promotion_to:Joi.string().required(),  
    promotion_date:Joi.string().required()
  });

module.exports=Emp_promotionSchema_joi;

  