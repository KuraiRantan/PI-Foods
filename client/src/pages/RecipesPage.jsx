//import { useSelector } from 'react-redux';
import './recipesPage.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FilterOrder from '../components/FilterOrder';
import Paginate from '../components/Paginate';
import Recipes from '../components/Recipes';
import { getUrlRequestApi } from '../helpers/url';
import { getDiets, getRecipes } from '../redux/actions';
import Loader from '../components/Loader';
import ErrorRequest from '../components/ErrorRequest';



const RecipesPage = () => {
    const { search } = useLocation();
    const dispatch = useDispatch();
    let { recipesState, dietsState } = useSelector(state => state);

    const query = new URLSearchParams(search);

    let page = query.get('page');
    page = (isNaN(Number(page)) || !Number(page)) ? 1 : Number(page);
    const cantItems = 9;
    const cantPages = Math.ceil(recipesState.recipes.length / cantItems);
    const recipes = recipesState.recipes?.slice(cantItems * page - cantItems, cantItems * page);
    const parameters = {
        diet: query.get('diet'),
        healthScore: query.get('healthScore'),
        order: query.get('order'),
        search: query.get('search'),
        page
    };
    const url = getUrlRequestApi(parameters);




    useEffect(() => {
        dispatch(getRecipes(url))
        dispatch(getDiets())
    }, [ dispatch, url])
    if (recipesState.isFailed || dietsState.isFailed) return (<ErrorRequest />);


    if (recipesState.isLoading || dietsState.isLoading) return (<Loader />);

    return (
        <>
            <FilterOrder diets={dietsState.diets} parameters={parameters} />
            <Recipes recipes={recipes} />
            <Paginate cantPages={cantPages} page={page} />

        </>
    );
};

export default RecipesPage;