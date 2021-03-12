const Project = require("../models/project");
const Ticket = require("../models/ticket");

/////////////////////////////////////////////////////////////*
// GET all projects
/////////////////////////////////////////////////////////////*
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

/////////////////////////////////////////////////////////////*
// GET project
/////////////////////////////////////////////////////////////*
exports.getProject = (req, res, next) => {
    //Find based on Project ID
    const projectId = req.params.projectId;
    if (!projectId) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

    Ticket.find({ projectId: projectId })
        .then((tickets) => {
            return res.status(200).json({
                tickets: tickets,
            });
        })
        .catch((err) => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(err);
        });
};

/////////////////////////////////////////////////////////////*
// POST project
/////////////////////////////////////////////////////////////*
exports.postAddProject = (req, res, next) => {
    //gets a new name for a project
    const projectName = req.body.name;
    const projectDescription = req.body.description;

    const newProject = new Project({
        name: projectName,
        description: projectDescription
    });

    //save it
    newProject.save().then((result) => {
        res.status(201).json({
            message: "Project Created",
        });
    });
};