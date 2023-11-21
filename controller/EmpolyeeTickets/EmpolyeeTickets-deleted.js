const EmpolyeeTickets = require("../../modals/EmpolyeeTicketsSchema/EmpolyeeTicketsSchema");

exports.empolyeeTicketsDeleted=( async (req, res) => {
    try {
        const deletedEmpolyeeTickets = await EmpolyeeTickets.findByIdAndDelete({_id:req.params.id});
        if (!deletedEmpolyeeTickets) {
            return res.status(404).send("EmpolyeeTickets doesn't exist!" );
        }
        return res.status(200).send( "Deleted EmpolyeeTickets" );
    } catch (error) {
        console.error(error);
        res.status(401).send( error);
    }
});

