const { register, login, dashboard , allUsers} = require('../controllers/user.controller');
const router = require('express').Router();
const verifyToken  = require('../middleware/verifyToken');





router.post('/signup', register);
router.post('/login', login);
router.get('/me' , verifyToken ,  dashboard)
router.get('/owners', verifyToken, allUsers)


module.exports = router;