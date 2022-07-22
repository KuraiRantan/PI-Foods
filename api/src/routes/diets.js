const { getDiets } = require('../controllers/diets');

const router = require('express').Router();



router.get('/', getDiets);



module.exports = router;