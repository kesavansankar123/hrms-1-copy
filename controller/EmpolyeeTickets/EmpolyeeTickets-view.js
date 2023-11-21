const EmpolyeeTickets = require("../../modals/EmpolyeeTicketsSchema/EmpolyeeTicketsSchema");


exports.empolyeeTicketsList=( async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Parse the page query parameter or default to 1
    const perPage = 10; // Set the number of items per page

    // Sort the EmpolyeeTickets collection by the 'employee' field in ascending order
    const EmpolyeeTicketss = await EmpolyeeTickets.find()
        .sort({ _id: 1 })
        .skip((page - 1) * perPage)
        .limit(perPage);

    res.status(200).send(EmpolyeeTicketss);
} catch (err) {
    res.status(400).send('error: ' + err);
}

});

