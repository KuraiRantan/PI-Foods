import { Link, useLocation } from "react-router-dom";

const Paginate = ({ cantPages, page }) => {
    const {search} = useLocation();
    const arrayPages = [...Array(cantPages)].map((value, idx) => idx+1);

    const getUrlPage = (p) => {
        let s = search;
        if(s.includes('?page=')){
            return s.replace(`?page=${page}`, `?page=${p}`);
        } else if(s.includes('&page=')){
            return s.replace(`&page=${page}`, `&page=${p}`);
        } else {
            return (search.includes('?')) ? `${search}&page=${p}` : `?page=${p}`;
        }

        
    };

    return (
        <div className="paginate">
            {arrayPages.map(p => (<Link to={getUrlPage(p)} >{p}</Link>))}
        </div>
    );  
};


export default Paginate;