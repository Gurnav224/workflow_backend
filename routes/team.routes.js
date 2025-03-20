const { createNewTeam, getTeams } = require('../controllers/team.controller');

const router = require('express').Router();


router.post('/new', createNewTeam);
router.get('/all', getTeams);



module.exports = router;