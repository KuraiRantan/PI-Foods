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