import recipeImg from '../assets/media/images/recipe.png';
import './loader.css';

const Loader = () => {


    return (
        <div className="loaderContainer">
            <div>
                <img src={recipeImg} alt="loader" />
                <p>LOADING...</p>
            </div>
        </div>
    );
};

export default Loader;