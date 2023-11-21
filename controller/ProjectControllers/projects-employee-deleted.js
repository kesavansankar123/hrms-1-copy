const Projects = require("../../modals/empProjectsSchema/ProjectsSchema");

exports.ProjectsDelete=( async (req, res) => {
    try {
        const deletedProjects = await Projects.findByIdAndDelete({_id:req.params.id});
        if (!deletedProjects) {
            return res.status(404).send("No data" );
        }
        return res.status(200).send("Project Deleted Successfully" );
    } catch (error) {
        res.status(401).send({ error: "err" });
    }
});

