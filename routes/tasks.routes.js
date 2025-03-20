const { createNewTask, getAllTasks } = require('../controllers/task.controller');

const router = require('express').Router();

router.post('/new' , createNewTask)
router.get('/all', getAllTasks)

module.exports = router;