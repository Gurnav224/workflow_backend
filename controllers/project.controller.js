const Project = require("../models/projects.model");

exports.createNewProject = async (req, res) => {
    const {name, description, status} = req.body;
    try {
        const project = new Project({name, description, status});
        await project.save();
        res.status(201).json(project)
    } catch (error) {
        console.log(RangeError)
        res.status(500).json({error:"failed create new project"})
    }
}


exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        if(projects.length === 0) {
            return res.status(404).json({error:"no project found"})
        }
        res.status(200).json(projects)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"server error"})
    }
}