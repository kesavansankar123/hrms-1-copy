const Clients = require("../../modals/Clients/Clients_schema");

exports.ClientsUpdated=(async (req, res) => {
    try {
        const Clientss_employees = await Clients.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!Clientss_employees) {
            return res.status(404).send("No Data");
        }

        return res.status(200).send("Client Data Updated Successfully");
    } catch (err) {
        res.status(401).send(err);
    }
});

