const { createNewTeam, getTeams, updateTeamById ,getTeamById} = require('../controllers/team.controller');

const router = require('express').Router();


router.post('/new', createNewTeam);
router.get('/all', getTeams);
router.get('/:teamId', getTeamById)
router.put('/:teamId', updateTeamById)


module.exports = router;