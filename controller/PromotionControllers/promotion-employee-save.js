const Promotion = require("../../modals/PromotionSchema/promotion");
const Emp_promotionSchema_joi = require("../../modals/PromotionSchema/Emp_promotionSchema_joi");

exports.promotionAdd=( async (req, res) =>  {
    try {
        const { error } = Emp_promotionSchema_joi.validate(req.body);

        if (error) {
          return res.status(400).send(error);
        }

        const { promotion_employee, department, promotion_from, promotion_to, promotion_date } = req.body;
       
        const formattedDate = new Date(promotion_date).toLocaleDateString('en-GB');

        const promotion_employees = new Promotion({
            promotion_employee,
            department,
            promotion_from,
            promotion_to,
            promotion_date,
        });
        
        const savedPromotion = await promotion_employees.save();

        res.status(200).send("Promotion Added Successfully");
    } catch (err) {
        res.status(401).send(err);
    }
});


