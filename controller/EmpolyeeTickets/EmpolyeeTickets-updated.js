const EmpolyeeTickets = require("../../modals/EmpolyeeTicketsSchema/EmpolyeeTicketsSchema");

exports.empolyeeTicketsUpdated=( async (req, res) => {
    try {
        const EmpolyeeTickets_employees = await EmpolyeeTickets.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!EmpolyeeTickets_employees) {
            return res.status(404).send("EmpolyeeTickets not found" );
        }

        return res.status(200).send( "Updated Successfully" );
    } catch (err) {
        res.status(401).send( err);
    }
});

