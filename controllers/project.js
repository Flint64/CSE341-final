const Project = require("../models/project");

exports.getProjects = (req, res, next) => {
  //gets the projects and displays them
  Project.find()
    .then((projects) => {
      res.status(200).json({
        projects: projects,
      });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postAddProject = (req, res, next) => {
  //gets a new name for a project
  const projectName = req.body.name;

  const newProject = new Project({
    name: projectName,
  });

  //save it
  newProject.save().then((result) => {
    res.status(201).json({
      message: "Project Created"
    });
  });
};
