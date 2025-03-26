const { createNewProject, getAllProjects, getProjectWithTasks } = require('../controllers/project.controller');

const router = require('express').Router();


router.post('/new', createNewProject);
router.get('/all', getAllProjects);
router.get('',getProjectWithTasks);

module.exports = router;