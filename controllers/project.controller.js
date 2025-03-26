const Project = require("../models/projects.model");
const Task = require("../models/task.model");

exports.createNewProject = async (req, res) => {
  const { name, description, status } = req.body;
  try {
    const project = new Project({ name, description, status });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.log(RangeError);
    res.status(500).json({ error: "failed create new project" });
  }
};

exports.getAllProjects = async (req, res) => {
  console.log(req.query);
  const { name } = req.query;
  let query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  try {
    const projects = await Project.find(query);
    if (projects.length === 0) {
      return res.status(404).json({ error: "no project found" });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

exports.getProjectWithTasks = async (req, res) => {
  const { projectId, tags, owners } = req.query;

  let priorityOrder = { high: 1, medium: 2, low: 3 };

  let query = { project: projectId };

  if (owners) {
    query.owners = owners;
  }

  if (tags) {
    query.tags = tags;
  }

  try {
    if (!projectId) {
      return res.status(400).json({ error: "Please provide projectId" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "project not found" });
    }

    const tasks = await Task.find(query).populate("team owners tags");

    tasks.sort((a, b) => {
      return a[priorityOrder] - b[priorityOrder];
    });

    res.status(200).json({ project, tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};
