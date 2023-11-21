const { empolyeeTicketsDeleted } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets-deleted");
const { empolyeeTicketsAdd } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets-save");
const { empolyeeTicketsUpdated } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets-updated");
const { empolyeeTicketsList } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets-view");
const { empolyeeTicketsSearch } = require("../../controller/EmpolyeeTickets/EmpolyeeTickets_search");
const express = require('express');
const router = express.Router();
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")
const { roles } = require('../../utils/constants'); // Define your role constants



router.get('/empolyeeTicketsSearch/:key',empolyeeTicketsSearch)
router.delete('/empolyeeTicketsDeleted/:id',empolyeeTicketsDeleted)
router.patch('/empolyeeTicketsUpdated/:id',empolyeeTicketsUpdated)
router.post('/empolyeeTicketsAdd',empolyeeTicketsAdd)
router.get('/empolyeeTicketsList',empolyeeTicketsList)

module.exports = router;
   