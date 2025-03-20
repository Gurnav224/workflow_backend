const { createNewProject, getAllProjects } = require('../controllers/project.controller');

const router = require('express').Router();


router.post('/new', createNewProject);
router.get('/all', getAllProjects);

module.exports = router;