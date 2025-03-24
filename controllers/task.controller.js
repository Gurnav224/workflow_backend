const Task = require("../models/task.model");


exports.createNewTask = async (req, res) => {
    const {name, project , team, owners, tags, timeToComplete, status } = req.body;
    try {
        const task = new Task({name, project , team, owners, tags, timeToComplete, status});
        await task.save();
        res.status(201).json(task)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'server error'})
    }
}

exports.getAllTasks  = async (req, res) => {
    const { team , owner , tags , project , status } = req.query;
    console.log(req.query)
    let query = {}
    if(status){
        query.status = status;

    }

    if(owner){
        query.owners = owner
    }

    if(tags) {
        query.tags = tags
    }

    if(project){
        query.project = project
    }

    try {
        const tasks = await Task.find(query).populate('owners project team');
        if(tasks.length === 0) {
            return res.status(404).json({error:'no task found'})
        }
        
        res.status(200).json(tasks)
        } catch (error) {
            console.error(error);
            res.status(500).json({error:"failed to get the task"})
    }
}