const { getRecipes, getDetailRecipe, postRecipe } = require('../controllers/recipes');

const router = require('express').Router();


router.get('/', getRecipes);
router.get('/:idReceta', getDetailRecipe);
router.post('/', postRecipe);


module.exports = router;