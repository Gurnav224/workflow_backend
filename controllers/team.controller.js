const Team = require("../models/team.model");


exports.createNewTeam =  async (req, res) => {
    const {name, description } = req.body;
    try {
        const team = new Team({name, description});
        await team.save()
        res.status(201).json(team);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'error to create new team'})
    }
}


exports.getTeams =  async (req , res) => {
    try {
        const teams = await Team.find({});
        if(teams.length === 0) {
            return res.status(404).json({error:"no team found"})
        }
        res.status(200).json(teams)
    } catch (error) {
        res.status(500).json({error:"server error to get teams"})
    }
}