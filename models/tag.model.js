const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unqiue:true
    }
})


const Tag = mongoose.model('Tag', tagSchema);


module.exports = Tag;