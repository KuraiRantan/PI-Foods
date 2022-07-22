import { Link } from "react-router-dom";
import noImage from '../assets/media/images/no-image.svg';

const Recipe = ({ id, image, name, diets, healthScore}) => {


    return (
        <div className="card">
            <img src={image || noImage} alt={name} />
            <Link to={`/recipe/detail/${id}`}>{name}</Link>
            <p>Health score: <span>{healthScore || 'N/A'}</span></p>
            <p><b>Diets:</b> {diets && (diets.reduce((acc,curr) => (acc === '') ? curr : `${acc} / ${curr}`, '') || 'No diets')}</p>
        </div >
    );
};


export default Recipe;