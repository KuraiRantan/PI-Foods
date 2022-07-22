import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUrlRequestApi } from "../helpers/url";
import { getRecipes } from "../redux/actions";
import Paginate from "./Paginate";
import Recipe from "./Recipe";

const Recipes = ({recipes}) => {

    return (
        <main className="mainRecipes">
            <h1>Recipes</h1>
            
            {
            (recipes?.length > 0) ? 
            recipes.map(r => (<Recipe key={r.id} id={r.id} name={r.name} image={r.image} diets={r.diets} healthScore={r.healthScore} />)):
            <p>There are no recipes</p>
        }
        
            
        </main>

    );
};


export default Recipes;