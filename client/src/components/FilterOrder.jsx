import { Link, useHistory } from "react-router-dom";
import { buildUrl } from "../helpers/url";

const FilterOrder = ({ diets, parameters }) => {

    const history = useHistory();
    
    const handlerEnter = (e) => {
        if(e.key === 'Enter'){
            buildUrl(parameters, 'search', e.target.value, history);
            e.target.value = '';
        }
    };


    
    return (
        <aside className="aside">
            <div className="searchContainer">
                <label htmlFor="search">Search</label>
                <input type='search' id="search" onKeyDown={ handlerEnter } placeholder='Name...' />
            </div>

            <ul>
            {parameters.diet && <li className="filterSelectedContainer"><span className="filterSelected" >Diet:{parameters.diet}<button onClick={() => buildUrl(parameters, 'diet', null, history)}>X</button></span></li>}
            {parameters.healthScore && <li className="filterSelectedContainer"><span className="filterSelected" >Healt score:{parameters.healthScore}<button onClick={() => buildUrl(parameters, 'healthScore', null, history)}>X</button></span></li>}
            {parameters.order && <li className="filterSelectedContainer"><span className="filterSelected" >Order recipes:{parameters.order}<button onClick={() => buildUrl(parameters, 'order', null, history)}>X</button></span></li>}
            {parameters.search && <li className="filterSelectedContainer"><span className="filterSelected" >Search:{parameters.search}<button onClick={() => buildUrl(parameters, 'search', null, history)}>X</button></span></li>}
            </ul>

            <h2>Filter by diets</h2>
            <ul>
            {
                diets.length > 0 ?
                diets.map(diet => (<li><Link className="linkDiet selectable" to={buildUrl(parameters, 'diet',diet.name)} key={diet.id}>{diet.name}</Link></li>)) :
                <p>There are no diets</p>
            }
            </ul>

            <h2>Sort</h2>
            <h3>By health score</h3>
            <Link className="linkOrder selectable" to={buildUrl(parameters, 'healthScore', 'asc')} >ASC</Link>
            <Link className="linkOrder selectable" to={buildUrl(parameters, 'healthScore', 'desc')} >DESC</Link>
            
            <h3>Alphabetically</h3>
            <Link className="linkOrder selectable" to={buildUrl(parameters, 'order', 'ASC')} >ASC</Link>
            <Link className="linkOrder selectable" to={buildUrl(parameters, 'order', 'DESC')} >DESC</Link>

        </aside>
    );
};


export default FilterOrder;