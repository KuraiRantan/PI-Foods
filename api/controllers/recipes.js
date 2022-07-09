const { Op } = require('sequelize');
const analizeDiets = require('../helpers/analize-diets');
const { validateUUIDV4 } = require('../helpers/validate-uuid');
const { Recipe, Diet } = require('../src/db');
const axios = require('axios').default;

const getRecipes = async (req, res) => {
    const { name } = req.query;
    const { limit, offset} = req.body;

    const pendingRequest = [];
    const options = {
        api: {
            params: {
                apiKey: process.env.API_KEY,
                number: 1,
                addRecipeInformation: true
            }
        },
        db: {
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [
                {
                    model:Diet, 
                    through: {
                        attributes: []
                    }
                }
            ]
            
        }
    };
    // if (name) {
    //     options.api.params.query = name;
    //     options.db.where = {
    //         name: {
    //             [Op.iLike]: `%${name}%`
    //         }
    //     }
    // }


    pendingRequest.push(Recipe.findAll((name) ? options.db: {
        include: [
            {
                model:Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        ]
    }));

    pendingRequest.push(axios.get(`https://api.spoonacular.com/recipes/complexSearch`, options.api));


    let [dbData, api] = await Promise.all(pendingRequest);

    dbData = dbData.map(recipe => {
        recipe = recipe.toJSON();
        recipe['Diets'] = recipe['Diets'].map(diet => diet.name)
        return recipe;
    });

    let apiData = api.data.results.map(recipe => {

        analizeDiets(recipe);

        return{
        id: recipe.id,
        name: recipe.title,
        image: recipe.image,
        imageType: recipe.imageType,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.glutenFree,
        diets: recipe.diets,
        stepByStep: (recipe.analyzedInstructions.length == 0) ?
            {} : (recipe.analyzedInstructions[0].steps.length === 0)? {} : recipe.analyzedInstructions[0]?.steps.reduce((acc, curr) => {
                acc[curr.number] = curr.step
                return acc;
            }, {})
    }});

   

    if(name){
        apiData = apiData.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
        if(dbData.length === 0 && apiData.length === 0) return res.json({msg: 'No hay recetas'});
    }

    
    const resultData = apiData.concat(dbData);

    res.json({results: resultData, totalRows: resultData.length});
    // if(name){
    //     const result = await Recipe.findAll({
    //         where:{
    //             name:{
    //                 [Op.iLike]: `%${name}%`
    //             }   
    //         }
    //     });
    //     if(result.length === 0) return res.json({msg: 'No hay recetas'})
    //     return res.json(result);
    // }
    // const result = await Recipe.findAndCountAll({
    //     limit: 9,
    //     offset: 9
    // });
    // res.json(result);
};


const getDetailRecipe = async (req, res) => {
    const idRecipe = req.params.idReceta;

    // const pendingRequest = [
    //     Recipe.findByPk(idRecipe),
    //     axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information`)
    // ];

    let data = null;

    try{if(validateUUIDV4(idRecipe)) {
        data = await Recipe.findByPk(idRecipe, {
            include: [
                {
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if(data === null) throw ({response: {status: 404, statusText: 'Not Found'}});
        data = data.toJSON();
        data['Diets'] = data['Diets'].map(recipe => recipe.name);

    } else {
        
        const response = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information`, {params: {apiKey: process.env.API_KEY}});
        data = await response.data;
        
        analizeDiets(data);
        data = {
            id: data.id,
            name: data.title,
            image: data.image,
            imageType: data.imageType,
            vegetarian: data.vegetarian,
            vegan: data.vegan,
            glutenFree: data.glutenFree,
            diets: data.diets,
            stepByStep: (data.analyzedInstructions.length == 0) ?
            {} : (data.analyzedInstructions[0].steps.length === 0)? {} : data.analyzedInstructions[0]?.steps.reduce((acc, curr) => {
                acc[curr.number] = curr.step
                return acc;
            }, {})
        }
    }
    }catch(err){
       return res.status(err.response.status).json({status: err.response.status, statusText:  err.response.statusText})
    }
    //const [dbData, api] = await Promise.all(pendingRequest);
    //console.log(dbData, api.data);

    res.json(data);
};


const postRecipe = async (req, res) => {
    // const { name, summary, healtScore, stepByStep, image } = req.body;
    const data = req.body;
    const diets = await Diet.findAll();
    const result = await Recipe.create(data, {includes: Diet})

    await result.addDiets(diets);

    const result2 = await Recipe.findAll({
        include: Diet
      });
      
    res.json({result, result2, diets});
};


module.exports = {
    getRecipes,
    getDetailRecipe,
    postRecipe,
};