import { LOAD_DIETS_FAILURE, LOAD_DIETS_REQUEST, LOAD_DIETS_SUCCESS } from "../actions";

const initialState = {
    diets: [],
    isLoading: false,
    isFailed: false
};

const reducer = (state=initialState, action) => {
    switch(action.type){

        case LOAD_DIETS_SUCCESS:
            return {
                ...state,
                diets: action.payload,
                isLoading: false
            };
        
        case LOAD_DIETS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailed: false
            };

        case LOAD_DIETS_FAILURE:
            return {
                ...state,
                isFailed: true,
                isLoading: false
            };

        default:
            return state;
    }
};

export default reducer;