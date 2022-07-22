// RECIPES
export const ADD_RECIPE = 'ADD_RECIPE';
export const LOAD_RECIPES_SUCCESS = 'LOAD_RECIPES_SUCCESS';
export const LOAD_RECIPES_BY_NAME_SUCCESS = 'LOAD_RECIPES_BY_NAME_SUCCESS';
export const LOAD_RECIPE_BY_ID_SUCCESS = 'LOAD_RECIPE_BY_ID_SUCCESS';
export const LOAD_RECIPES_FAILURE = 'LOAD_RECIPES_FAILURE';
export const LOAD_RECIPES_REQUEST = 'LOAD_RECIPES_REQUEST';
export const SEND_RECIPE_REQUEST = 'SEND_RECIPE_REQUEST';
export const SEND_RECIPE_SUCCESS = 'SEND_RECIPE_SUCCESS';
export const SEND_RECIPE_FAILED = 'SEND_RECIPE_FAILED';
export const SEND_RECIPE_ALERT_TIME = 'SEND_RECIPE_ALERT_TIME';


const getRecipes = (queryParameters='') => {
    return async (dispatch) => {
        let payload = [];
        try {
            dispatch({type: LOAD_RECIPES_REQUEST});
            let res = await fetch(`http://localhost:3001/recipes/${queryParameters}`);
            res = await res.json();
            if(res.status) throw res;
            payload = res;
        } catch (error) {
            const { status } = error;
            if(!(status === 404)) return dispatch({
                type: LOAD_RECIPES_FAILURE
            });
        }
        
        dispatch({
            type: LOAD_RECIPES_SUCCESS,
            payload
        });
    };
};

const getRecipeById = (id='') => {
    return async (dispatch) => {
        let payload = {};
        try {
            dispatch({type: LOAD_RECIPES_REQUEST});
            let res = await fetch(`http://localhost:3001/recipes/${id}`);
            res = await res.json();
            if(res.status) throw res;
            payload = res;
        } catch (error) {
            const { status } = error;
            if(!(status === 404)) return dispatch({
                type: LOAD_RECIPES_FAILURE
            });
        }

        dispatch({
            type: LOAD_RECIPE_BY_ID_SUCCESS,
            payload
        });
    };
};


const postRecipe = (recipe) => {
    return async (dispatch) => {
        try {
            dispatch({type: SEND_RECIPE_REQUEST});
            await fetch('http://localhost:3001/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            })

        } catch (error) {
            const { status } = error;
            if(!(status === 400)) return dispatch({
                type: LOAD_RECIPES_FAILURE
            });
        }
        dispatch({type: SEND_RECIPE_SUCCESS});
        dispatch({type: SEND_RECIPE_ALERT_TIME});
    };
};


// DIETS
export const LOAD_DIETS_SUCCESS = 'LOAD_DIETS_SUCCESS';
export const LOAD_DIETS_FAILURE = 'LOAD_DIETS_FAILURE';
export const LOAD_DIETS_REQUEST = 'LOAD_DIETS_REQUEST';

const getDiets = () => {
    return async (dispatch) => {
        let payload = [];
        try {
            dispatch({type: LOAD_DIETS_REQUEST});
            let res = await fetch('http://localhost:3001/diets');
            res = await res.json();
            if(res.status) throw res;
            payload = res;
            
        } catch (error) {
            const { status } = error;
            if(!(status === 404)) return dispatch({
                type: LOAD_DIETS_FAILURE
            });
        }
        dispatch({
            type: LOAD_DIETS_SUCCESS,
            payload
        });
    };
};

export {
    getRecipes,
    getRecipeById,
    getDiets,
    postRecipe
};