import { LOAD_RECIPES_BY_NAME_SUCCESS, LOAD_RECIPES_FAILURE, LOAD_RECIPES_REQUEST, LOAD_RECIPES_SUCCESS, LOAD_RECIPE_BY_ID_SUCCESS, SEND_RECIPE_ALERT_TIME, SEND_RECIPE_REQUEST, SEND_RECIPE_SUCCESS } from "../actions";



const initialState = {
    recipes: [],
    recipeDetail: {},
    isLoading: false,
    isSend: false,
    isFailed: false
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        
        case LOAD_RECIPES_SUCCESS:
        case LOAD_RECIPES_BY_NAME_SUCCESS:
            return {
                ...state,
                recipes: action.payload,
                isLoading: false
            };

        case LOAD_RECIPE_BY_ID_SUCCESS:
            return {
                ...state,
                recipeDetail: action.payload,
                isLoading: false
            };
        
        case LOAD_RECIPES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailed: false
            };

        case LOAD_RECIPES_FAILURE:
            return {
                ...state,
                isFailed: true,
                isLoading: false
            };
        
        case SEND_RECIPE_REQUEST:
                return {
                    ...state,
                    isLoading: true,
                    isSend: false,
                    isFailed: false
                };
            
        case SEND_RECIPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSend: true
            };

        case SEND_RECIPE_ALERT_TIME:
            return {
                ...state,
                isSend: false
            };


        default:
            return state;
    }

};


export default reducer;