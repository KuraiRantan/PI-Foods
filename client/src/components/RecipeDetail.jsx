import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../redux/actions";
import Loader from "./Loader";
import ErrorRequest from './ErrorRequest';
import noImage from '../assets/media/images/no-image.svg';

const RecipeDetail = () => {
    const {idRecipe} = useParams();
    const dispatch = useDispatch();
    const {recipeDetail, isLoading, isFailed} = useSelector(state => state.recipesState);
    const { name, image, diets, stepByStep, summary, healthScore} = recipeDetail;


    useEffect(() => {
        dispatch(getRecipeById(idRecipe));
    },[dispatch, idRecipe])

    if(isFailed) return (<ErrorRequest />);

    if(isLoading) return (<Loader />);


    return (
        <main className="mainRecipeDetail">
            <div className="mainInfoContainer">
                {(Object.keys(recipeDetail).length !== 0) ?
                    (<><h1>{name}</h1>
                    <img className="imgRecipe" src={image || noImage} alt={name} />

                    <h2>Diets:</h2>
                    {(diets.length > 0) ?
                    diets.map((diet, idx) => (<p key={idx}>{diet}</p>)) : 
                    <p>No diets</p>}

                    <h2>Summary:</h2>
                    <p>{summary?.replace(/(<([^>]+)>)/ig, '') || 'No summary'}</p>

                    <h2>Healt Score: </h2>
                    <span>{healthScore || 0}</span>

                    <h2>STEP BY STEP:</h2>
                    {(Object.keys(stepByStep || {}).length > 0) ?
                        Object.keys(stepByStep)?.map((step, idx) => (<div key={idx+1}>
                        <h3>Step {idx+1}:</h3>
                        <p>{stepByStep[idx+1]}</p>
                    </div>)) :
                        <p>Don't have Step By step</p>
                    }</>) :
                (<p>Recipe not found</p>)
                }
            </div>
            
        </main>
    );
};


export default RecipeDetail;