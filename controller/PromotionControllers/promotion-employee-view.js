const promotion = require("../../modals/PromotionSchema/promotion");

exports.promotionList=async (req, res) => {
    const perPage = 10;
    const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1
  
    try {
        const totalUsers = await promotion.countDocuments();
        const totalPages = Math.ceil(totalUsers / perPage);
  
        const data = await promotion
            .find()
            .sort({ _id: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage);
  
        if (data && data.length > 0) {
            res.status(200).send({
                data,
                totalPages:totalPages,
                currentPage: page,
            });
        } else {
            res.status(400).send("No Users");
        }
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
  };

