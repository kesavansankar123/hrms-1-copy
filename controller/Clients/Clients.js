const ClientsdeletedRouter = require("./Clients-deleted");
const ClientsAddRouter = require("./Clients-save");
const ClientssUpdateRouter = require("./Clients-updated");
const ClientsviewRouter = require("./Clients-view");
const ClientsSearchRouter = require("./Clients_search");
const ClientsallApi= require("express").Router();


ClientsallApi.use('/Clients-save',ClientsAddRouter)
ClientsallApi.use('/Clients-deleted',ClientsdeletedRouter)
ClientsallApi.use('/Clients-Update',ClientssUpdateRouter)
ClientsallApi.use('/Clients-viewDetails',ClientsviewRouter)
ClientsallApi.use('/Clients-search',ClientsSearchRouter)






module.exports=ClientsallApi