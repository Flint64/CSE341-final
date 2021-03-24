const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth');

const projectController = require('../controllers/project');

router.get('/projects', projectController.getProjects);

router.get('/project/:projectId', projectController.getProject);

router.post('/submitProject',
    isAuth, [
        body('name', 'Name must be at least 4 characters and only text & numbers').isLength({ min: 4 }).isAlphanumeric().trim().custom((value, { req }) => {
            return Project.findOne({ name: value }).then(projectDoc => {
                if (projectDoc) {
                    return Promise.reject('Project name already exists. Please pick a different one.')
                }
            })
        }),
        body('description', 'Description must be at least 4 characters long.').isLength({ min: 4 })
        //Must have a unique name
    ], projectController.postAddProject);

// router.post('/removeProject', projectController.function);

module.exports = router;