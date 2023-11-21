const Promotion = require("../../modals/PromotionSchema/promotion");
exports.promotionUpdated=( async (req, res) => {
    try {
        const promotion_employees = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!promotion_employees) {
            return res.status(404).send("No User");
        }

        return res.status(200).send("Promotion data is Updated Successfully");
    } catch (err) {
        console.error(err);
        res.status(401).send(err);    }
});


