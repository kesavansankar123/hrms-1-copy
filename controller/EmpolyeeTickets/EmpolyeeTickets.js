const EmpolyeeTicketsdeletedRouter = require("./EmpolyeeTickets-deleted");
const EmpolyeeTicketsAddRouter = require("./EmpolyeeTickets-save");
const EmpolyeeTicketsUpdateRouter = require("./EmpolyeeTickets-updated");
const EmpolyeeTicketsviewRouter = require("./EmpolyeeTickets-view");
const EmpolyeeTicketsSearchRouter = require("./EmpolyeeTickets_search");
const EmpolyeeTicketsallApi= require("express").Router();


EmpolyeeTicketsallApi.use("/EmpolyeeTickets_save",EmpolyeeTicketsAddRouter)
EmpolyeeTicketsallApi.use("/EmpolyeeTickets_deleted",EmpolyeeTicketsdeletedRouter)
EmpolyeeTicketsallApi.use("/EmpolyeeTickets_updated",EmpolyeeTicketsUpdateRouter)
EmpolyeeTicketsallApi.use("/EmpolyeeTickets_view",EmpolyeeTicketsviewRouter)
EmpolyeeTicketsallApi.use("/EmpolyeeTickets_search",EmpolyeeTicketsSearchRouter)







module.exports=EmpolyeeTicketsallApi