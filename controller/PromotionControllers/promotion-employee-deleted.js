const Promotion = require("../../modals/PromotionSchema/promotion");

exports.promotionDelete=( async (req, res) => {
    try {
        const deletedPromotion = await Promotion.findByIdAndDelete({_id:req.params.id});
        if (!deletedPromotion) {
            return res.status(404).send("No User");
        }
        return res.status(200).send("Promotion Data Deleted Successfully");
    } catch (error) {
        console.error(error);
        res.status(401).send(err);}
});

