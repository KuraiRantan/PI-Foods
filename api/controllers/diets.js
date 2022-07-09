const { default: axios } = require('axios');
const analizeDiets = require('../helpers/analize-diets');
const { Diet } = require('../src/db');


const getDiets = async (req, res) => {

    const diets = [];
    const defaultDiets = [
        'gluten free',
        'ketogenic',
        //'vegetarian',
        'lacto vegetarian',
        'ovo vegetarian',
        'lacto ovo vegetarian',
        'vegan',
        'pescetarian',
        'paleo',
        'primal',
        'low FODMAP',
        'whole30'
    ];

    const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`,{
        params: {
            apiKey: process.env.API_KEY,
            number: 100,
            addRecipeInformation: true
        }
    });

    let apiData = api.data.results.map(recipe => {

        analizeDiets(recipe);

        return recipe.diets;
    })[0];

    apiData.forEach(diet => {
        if(!defaultDiets.includes(diet)) defaultDiets.push(diet);
    });

    for(let diet of defaultDiets){
        const result = await Diet.findOrCreate({
            where: {
                name: diet
            }
        });
        diets.push(result[0]);
    }
    res.json(diets);
};


module.exports = {
    getDiets,
};