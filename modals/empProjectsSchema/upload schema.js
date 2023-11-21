// models/empProjectsSchema/ProjectsSchema.js
const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  // Define your model schema here
  filename: String,
  fileId: String,
  // Other fields as needed
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;
