const { Op } = require('sequelize');
const { getApiData } = require('../helpers/getApiData');
const { validateUUIDV4 } = require('../helpers/validate-uuid');
const { Recipe, Diet } = require('../db');


const getRecipes = async (req, res) => {
    const { name = '', healthScore = '', order = '', diet = '' } = req.query;

    const pendingRequest = [];
    const options = {
        api: {
            params: {
                apiKey: process.env.API_KEY,
                number: 100,
                addRecipeInformation: true
            }
        },
        db: {
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            attributes: {
                exclude: ['stepByStep', 'summary']
            },
            include: [
                {
                    model: Diet,
                    as: 'diets',
                    through: {
                        attributes: []
                    }
                }
            ]

        }
    };

    try {
        pendingRequest.push(Recipe.findAll((name !== '') ? options.db : {
            attributes: {
                exclude: ['summary', 'stepByStep']
            },
            include: [
                {
                    model: Diet,
                    as: 'diets',
                    through: {
                        attributes: []
                    }
                }
            ]
        }));

        pendingRequest.push(getApiData(`https://api.spoonacular.com/recipes/complexSearch`, options.api));


        let [dbData, apiData] = await Promise.all(pendingRequest);

        dbData = dbData.map(recipe => {
            recipe = recipe.toJSON();
            recipe.diets = recipe.diets.map(diet => diet.name)
            return recipe;
        });

        // filters and sorts
        if (name !== '') {
            apiData = apiData.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
            if (dbData.length === 0 && apiData.length === 0) throw ({
                response: {
                    status: 404,
                    statusText: `No recipes available.`
                }
            });
        }

        let resultData = apiData.concat(dbData);

        if (diet !== '') resultData = resultData.filter(r => r.diets.includes(diet));

        if (order?.toLowerCase() === 'asc') {
            resultData.sort((first, second) => (first.name.toLowerCase() > second.name.toLowerCase()) ?
                1 :
                (first.name.toLowerCase() < second.name.toLowerCase()) ?
                    -1 :
                    0
            );
        } else if (order?.toLowerCase() === 'desc') {
            resultData.sort((first, second) => (first.name.toLowerCase() > second.name.toLowerCase()) ? -1 : (first.name.toLowerCase() < second.name.toLowerCase()) ? 1 : 0);
        } else if (healthScore?.toLowerCase() === 'asc') {
            resultData.sort((first, second) => first.healthScore - second.healthScore);
        } else if (healthScore?.toLowerCase() === 'desc') {
            resultData.sort((first, second) => second.healthScore - first.healthScore);
        }

        res.status(200).json(resultData);
    } catch (err) {
        if (err.response) {
            const { status, statusText } = err.response;
            if (status && statusText) return res.status(status).json({ status, statusText });
        }
        res.status(500).json({ status: 500, statusText: 'Server error.' });
    }



};


const getDetailRecipe = async (req, res) => {
    const { idReceta: idRecipe } = req.params;

    let data = null;

    try {
        if (validateUUIDV4(idRecipe)) {
            data = await Recipe.findByPk(idRecipe, {
                include: [
                    {
                        model: Diet,
                        as: 'diets',
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            });
            if (data === null) throw ({
                response: {
                    status: 404,
                    statusText: `A recipe with the id ${idRecipe} does not exist.`
                }
            });
            data = data.toJSON();
            data.diets = data.diets.map(recipe => recipe.name);

        } else {

            data = await getApiData(`https://api.spoonacular.com/recipes/${idRecipe}/information`, {
                params: {
                    apiKey: process.env.API_KEY
                }
            });

        }
        res.status(200).json(data);
    } catch (err) {
        if (err.response) {
            const { status, statusText } = err.response;
            if (status && statusText) return res.status(status).json({ status, statusText });
        }
        res.status(500).json({ status: 500, statusText: 'Server error.' });
    }


};


const postRecipe = async (req, res) => {
    // const { name, summary, healtScore, stepByStep, image, diets} = req.body;
    let { diets, ...data } = req.body;
    let created = null;

    try {

        if (!(data.name && data.summary ||
            data.name.trim() !== '' &&
            data.summary.trim() !== '')
        ) return res.status(400).json({ status: 400, statusText: 'Bad Request' });

        if (!data.healthScore) data.healthScore = 0;

        const result = await Recipe.create(data);

        diets = diets.map(d => d.id);
        await result.addDiets(diets);

        created = await Recipe.findByPk(result.toJSON().id, {
            include: [{
                model: Diet,
                as: 'diets',
                through: {
                    attributes: []
                }
            }]
        });
        res.status(201).json(created);
    } catch (err) {
        if (err.response) {
            const { status, statusText } = err.response;
            if (status && statusText) return res.status(status).json({ status, statusText });
        }
        res.status(500).json({ status: 500, statusText: 'Server error.' });
    }
};


module.exports = {
    getRecipes,
    getDetailRecipe,
    postRecipe,
};