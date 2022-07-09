const analizeDiets = (recipe) => {
    if(recipe.vegetarian){
        let flag = true;
        recipe.diets.forEach(diet => {
            if(diet.includes('vegetarian')) flag = false;
        });
        if(flag) recipe.diets.push('vegetarian');
    }
    if(recipe.vegan && !recipe.diets.includes('vegan')) recipe.diets.push('vegan');
    
    if(recipe.glutenFree && !recipe.diets.includes('gluten free')) recipe.diets.push('gluten free');
};


module.exports = analizeDiets;