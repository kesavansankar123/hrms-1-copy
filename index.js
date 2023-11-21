const express = require('express');
const DBDetails = require('./config/db');
const services=require("./service/service")
const corsOption=require("./cors/cors")
const app=express();
const cors = require('cors');
require('dotenv').config();



DBDetails()

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!!')
  })
  
  app.use(cors(corsOption)); 
  
  app.use('/',services)

  
   app.listen(process.env.port, () => {
    console.log(`Example app listening on port ${process.env.port}`)
  })
