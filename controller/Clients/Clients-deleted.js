const Clients = require("../../modals/Clients/Clients_schema");

exports.ClientsDelete=( async (req, res) => {
    try {
        const deletedClients = await Clients.findByIdAndDelete({_id:req.params.id});
        if (!deletedClients) {
            return res.status(404).send("No Data");
        }
        return res.status(200).send("Client Data Deleted Successfully");
    } catch (error) {
        console.error(error);
        res.status(401).send(error);
    }
});

