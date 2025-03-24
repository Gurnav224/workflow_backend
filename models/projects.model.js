const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed", "Blocked"],
        default: "To Do",
      },
})


const Project = mongoose.model('Project', projectSchema);


module.exports = Project;