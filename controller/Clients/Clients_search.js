const Clients = require("../../modals/Clients/Clients_schema");

exports.ClientsSearch=( async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1
        const perPage = 10; // Set the number of items per page

        // Use the 'key' route parameter for searching
        const key = req.params.key;
        
        // Construct a query to search for clients containing the 'key'
        const query = {
            $or: [
                { client_name: { $regex: key, $options: "i" } },
                { client_email: { $regex: key, $options: "i" } },
                { client_company: { $regex: key, $options: "i" } },
                { client_mobilenumber: isNaN(numericKey) ? { $regex: key, $options: "i" } : numericKey },
                { client_address: { $regex: key, $options: "i" } },
            ]
        };

        // Perform the search with pagination
        const clients = await Clients
            .find(query)
            .sort({ client_name: 1 }) // Sort by the client name (you can change this)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).send( clients );
    } catch (err) {
        res.status(500).send(err.message ); // Return a structured error response
    }
});

exports.getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await Clients.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};