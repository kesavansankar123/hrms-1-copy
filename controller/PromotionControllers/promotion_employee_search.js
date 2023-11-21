const promotion = require("../../modals/PromotionSchema/promotion");

exports.promotionSearch=( async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1
        const perPage = 10; // Set the number of items per page

        // Use the 'key' route parameter for searching
        const key = req.params.key;

        // Construct a query to search for promotions containing the 'key'
        const query = {
            $or: [
                { promotion_employee: { $regex: key, $options: "i" } },
                { department: { $regex: key, $options: "i" } },
                { promotion_from: { $regex: key, $options: "i" } },
                { promotion_to: { $regex: key, $options: "i" } },            ]
        };

        // Perform the search with pagination
        const promotions = await promotion
            .find(query)
            .sort({ promotion_date: 1 }) // Sort by the promotion date (you can change this)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).send( promotions );
        
    } catch (err) {
        res.status(500).send(err); // Return a structured error response
    }
});

exports.getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await promotion.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};


