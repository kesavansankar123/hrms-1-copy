const allemployee = require("../../modals/all-empolyeeSchema/allEmpolyeeSchema");

exports.allemployeeDelete=( async (req, res) => {
    try {
        const deletedallemployee = await allemployee.findByIdAndDelete({_id:req.params.id});
        if (!deletedallemployee) {
            return res.status(404).send("No Datas" );
        }
        return res.status(200).send( "Employee Data is Deleted" );
    } catch (error) {
        console.error(error);
        res.status(401).send(error );
    }
});

