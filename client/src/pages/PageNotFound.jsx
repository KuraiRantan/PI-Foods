import pageNotFoundImage from '../assets/media/images/page-not-found.svg';
import './pageNotFound.css';

const PageNotFound = () => {

    return (
        <div className="pageNotFoundContainer">
            <img src={pageNotFoundImage} alt="pageNotFoundImage" />
            <p>Page Not Found</p>
        </div>
    );
};


export default PageNotFound;