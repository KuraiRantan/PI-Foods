import { combineReducers } from 'redux';
import recipesReducer from './recipes';
import dietsReducer from './diets';


const rootReducer = combineReducers({
    recipesState: recipesReducer,
    dietsState: dietsReducer
});

export default rootReducer;