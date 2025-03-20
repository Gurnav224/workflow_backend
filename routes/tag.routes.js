const { createNewTag, getAllTags } = require('../controllers/tag.controller');

const router  =  require('express').Router();

router.post('/new', createNewTag );
router.get('/all', getAllTags);


module.exports = router;