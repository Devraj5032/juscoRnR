const router = require('express').Router();
const {read} = require('../controllers/qna_list');

router.get('/read',read)

module.exports = router;