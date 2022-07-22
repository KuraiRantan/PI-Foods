const { getApiData } = require('../helpers/getApiData');
const { Diet } = require('../db');


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

    try {
        
        let apiData = await getApiData(`https://api.spoonacular.com/recipes/complexSearch`,{
            params: {
                apiKey: process.env.API_KEY,
                number: 100,
                addRecipeInformation: true
            }
        });
        
        apiData = apiData.reduce((prev, curr) => [...prev, ...curr.diets], []);
    
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
        res.status(200).json(diets);
    } catch (err) {
        if(err.response){
            const { status, statusText } = err.response;
            if (status && statusText) return res.status(status).json({ status, statusText });
        }
        res.status(500).json({ status: 500, statusText: 'Server error.' });
    }

};


module.exports = {
    getDiets,
};