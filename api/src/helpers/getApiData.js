const { default: axios } = require("axios");
const analizeDiets = require("./analize-diets");

const getApiData = (url='', options) => {
    return new Promise((resolve, reject) => {



        axios.get(url, options)
        .then(res => {
            let response = res.data;
            
            if(response.hasOwnProperty('results')){
                response = response.results.map(recipe => {

                    analizeDiets(recipe);
            
                    return {
                        id: recipe.id,
                        name: recipe.title,
                        image: recipe.image,
                        //imageType: recipe.imageType,
                        healthScore: recipe.healthScore,
                        //vegetarian: recipe.vegetarian,
                        //vegan: recipe.vegan,
                        //glutenFree: recipe.glutenFree,
                        diets: recipe.diets,
                        
                        // stepByStep: (recipe.analyzedInstructions.length == 0) ?
                        //     {} : (recipe.analyzedInstructions[0].steps.length === 0)? {} : recipe.analyzedInstructions[0]?.steps.reduce((acc, curr) => {
                        //         acc[curr.number] = curr.step
                        //         return acc;
                        //     }, {})
                    };
                });
            } else {
                analizeDiets(response);
                response = {
                    id: response.id,
                    name: response.title,
                    summary: response.summary,
                    healthScore: response.healthScore,
                    image: response.image,
                    //imageType: response.imageType,
                    //vegetarian: response.vegetarian,
                    //vegan: response.vegan,
                    //glutenFree: response.glutenFree,
                    diets: response.diets,
                    stepByStep: (response.analyzedInstructions.length == 0) ?
                    {} : (response.analyzedInstructions[0].steps.length === 0)? {} : response.analyzedInstructions[0]?.steps.reduce((acc, curr) => {
                        acc[curr.number] = curr.step
                        return acc;
                    }, {})
                };
            } // Fin else
            resolve(response);

        })
        .catch(err => reject(err));

    });
};


module.exports = {
    getApiData,
}