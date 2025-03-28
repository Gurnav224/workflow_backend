const { createNewTask, getAllTasks , getTaskById, getUpdateTaskById} = require('../controllers/task.controller');

const router = require('express').Router();

router.post('/new' , createNewTask)
router.get('/all', getAllTasks)
router.get('/:taskId', getTaskById);
router.put('/:taskId', getUpdateTaskById)
module.exports = router;