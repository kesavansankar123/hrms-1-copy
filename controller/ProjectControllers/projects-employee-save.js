const express = require("express");
const Projects = require("../../modals/empProjectsSchema/ProjectsSchema");
const Emp_projectsSchema_joi = require("../../modals/empProjectsSchema/Emp_projectsSchema_joi");

exports.ProjectsAdd=( async (req, res) => {
    try {
        const { error } = Emp_projectsSchema_joi.validate(req.body);

        if (error) {
          return res.status(400).send(error);    
        }
        const {Project_Name,Client,Priority,Add_Project_Leader,Team_Members,Description,Rate,Start_Date,end_Date } = req.body;
        const formattedStartDate = new Date(Start_Date).toLocaleDateString('en-GB');
        const formattedEndDate = new Date(end_Date).toLocaleDateString('en-GB');
        const Projects_employees = new Projects({
            Project_Name,
            Client,
            Priority,
            Add_Project_Leader,
            Team_Members,
            Description,
            // Upload_File,
            Rate,
            Start_Date:formattedStartDate,
            end_Date:formattedEndDate
        });
   

        const savedProjects = await Projects_employees.save();

        res.status(200).send("Project Added Successfully"+formattedEndDate);
    } catch (err) {
        console.error(err);
        res.status(401).send( err);
    }
});





// const express = require('express');
// const mongoose = require('mongoose');
// const { Readable } = require('stream');
// const multer = require('multer');
// const { GridFSBucket } = require('mongodb');
// const Grid = require("gridfs-stream");
// const Projectss = require("../../modals/empProjectsSchema/ProjectsSchema");
// const Emp_projectsSchema_joi = require("../../modals/empProjectsSchema/Emp_projectsSchema_joi");
// const Projects = require("../../modals/empProjectsSchema/upload schema");
// const path = require('path');
// const crypto = require('crypto');
// const {GridFsStorage }= require('multer-gridfs-storage');





// // Mongo URI
// const mongoURI = "mongodb+srv://admin:gokul@mern.sqrvp1s.mongodb.net/?retryWrites=true&w=majority";

// // Create mongo connection
// const conn = mongoose.createConnection(mongoURI);

// // Init gfs
// let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         // Assuming _id should be assigned or fetched from somewhere
//         fileInfo._id = /* Your logic to assign or fetch _id */
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// exports.upload = multer({ storage });


// exports.uploadFile = async (req, res) => {
//   try {
//     if (req.file === undefined) throw new Error("You must select a file.");

//     // Save file information to the database


//     return res.send("Upload successful");
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };



