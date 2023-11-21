const allemployee = require("../../modals/all-empolyeeSchema/allEmpolyeeSchema");

exports.allemployeeUpadated=( async (req, res) => {
    try {
        const allemployee_employees = await allemployee.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!allemployee_employees) {
            return res.status(404).send("No Data" );
        }

        return res.status(200).send( "Employee Data Updated Successfully" );
    } catch (err) {
        console.error(err);
        res.status(401).send( err );
    }
});

