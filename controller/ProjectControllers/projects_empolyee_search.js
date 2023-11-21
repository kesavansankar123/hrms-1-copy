const Projects = require("../../modals/empProjectsSchema/ProjectsSchema");

exports.ProjectsSearch=( async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1
        const perPage = 10; // Set the number of items per page

        // Use the 'key' route parameter for searching
        const key = req.params.key;
        
        // Construct a query to search for projects containing the 'key'
        const query = {
            $or: [
                { Project_Name: { $regex: key, $options: "i" } },
                { Client: { $regex: key, $options: "i" } },
                { Priority: { $regex: key, $options: "i" } },
                { Add_Project_Leader: { $regex: key, $options: "i" } },
                { Team_Members: { $regex: key, $options: "i" } },
                { Description: { $regex: key, $options: "i" } },
                // {Rate : isNaN(numericKey) ? { $regex: key, $options: "i" } : numericKey },

            ]
        };

        // Perform the search with pagination
        const projects = await Projects
            .find(query)
            .sort({ Project_Name: 1 }) // Sort by the project name (you can change this)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).send( projects );
    } catch (err) {
        res.status(500).send( err); // Return a structured error response
    }
});

exports.getId = async (req, res) => {
    const {id}=req.params
    try {
        const users = await Projects.findById(id)
            if (users) {
              res.status(200).send(users);
            } else {
              res.status(400).send("No Users"); 
            }  
          } catch (err) {
        res.status(400).send('error: ' + err);
    }
};