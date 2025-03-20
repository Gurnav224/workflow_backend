const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    }
})


const Project = mongoose.model('Project', projectSchema);


module.exports = Project;