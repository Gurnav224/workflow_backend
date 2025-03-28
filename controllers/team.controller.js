const Team = require("../models/team.model");
const mongoose = require('mongoose')

exports.createNewTeam = async (req, res) => {
  const { name, description, members } = req.body;
  try {
    const team = new Team({ name, description, members });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error to create new team" });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    if (teams.length === 0) {
      return res.status(404).json({ error: "no team found" });
    }
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "server error to get teams" });
  }
};

exports.getTeamById = async (req, res) => {
    const {teamId} = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ error: "Invalid team ID" });
          }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
          }
          res.status(200).json(team)
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: "server error" });
  
    }
}

exports.updateTeamById = async (req, res) => {
  const {teamId} = req.params;
  const { memberName } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ error: "Invalid team ID" });
      }


    const team = await Team.findByIdAndUpdate(teamId, {
      $push: { members:{memberName} },
    });

    if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};
