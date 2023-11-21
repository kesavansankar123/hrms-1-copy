const employeeTicketsJoiSchema = require("../../modals/EmpolyeeTicketsSchema/EmpolyeeTicketsSchema_joi");
const EmpolyeeTickets = require("../../modals/EmpolyeeTicketsSchema/EmpolyeeTicketsSchema");

exports.empolyeeTicketsAdd=( async (req, res) => {
    try {
        const { error } = employeeTicketsJoiSchema.validate(req.body);

        if (error) {
          return res.status(400).send(error.details[0].message);
        }

        const {  project,
            ticket_id,
            assign_to,
            ticket_followers,
            client,
            priority,
            status,
            // attachment,
            description,
            create_date,} = req.body;
            
            const formattedEndDate = new Date(create_date).toLocaleDateString('en-GB');
        
        const EmpolyeeTickets_employees = new EmpolyeeTickets({
            project,
            ticket_id,
            assign_to,
            ticket_followers,
            client,
            priority,
            status,
            // attachment,
            description,
            create_date:formattedEndDate,
        });

        const savedEmpolyeeTickets = await EmpolyeeTickets_employees.save();

        res.status(201).send("Tickets Added Successfully");
    } catch (err) {
        res.status(401).send( err);
    }
});


