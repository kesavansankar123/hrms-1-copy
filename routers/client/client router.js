const { ClientsDelete } = require("../../controller/Clients/Clients-deleted");
const { ClientsAdd } = require("../../controller/Clients/Clients-save");
const { ClientsUpdated } = require("../../controller/Clients/Clients-updated");
const { ClientsList } = require("../../controller/Clients/Clients-view");
const { ClientsSearch,getId } = require("../../controller/Clients/Clients_search");
const express = require('express');
const router = express.Router();
const {checkUserRole,authenticateUser}=require("../../controller/loginuser controller")
const { roles } = require('../../utils/constants'); // Define your role constants





router.get('/',ClientsList)
router.patch('/update/:id',ClientsUpdated)
router.post('/registration',ClientsAdd)
router.get('/:id',getId)
router.delete('/delete/:id',ClientsDelete)
router.get('/data/:key',ClientsSearch)

module.exports = router;
