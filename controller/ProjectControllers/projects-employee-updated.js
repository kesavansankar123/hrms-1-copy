const Projects = require("../../modals/empProjectsSchema/ProjectsSchema");

exports.ProjectsUpdated=( async (req, res) => {
    try {
        const Projects_employees = await Projects.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!Projects_employees) {
            return res.status(404).send( "Projects not found");
        }

        return res.status(200).send( "Updated Successfully" );
    } catch (err) {
        console.error(err);
        res.status(401).send( err);
    }
});

