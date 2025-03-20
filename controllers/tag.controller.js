const Tag = require("../models/tag.model")


exports.createNewTag = async (req, res) => {
    const {name} = req.body
    try {
        const tag = new Tag({name});
        await tag.save();
        res.status(201).json(tag)
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'server error'})
    }
}


exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find({});

        if(tags.length === 0) {
            res.status(404).json({error:"no tag found"})
        }

        res.status(200).json(tags)

    } catch (error) {
        console.error(error);
        res.status(500).json({error:'server error'})
    }
}