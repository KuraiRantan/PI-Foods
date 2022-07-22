import errorImage from '../assets/media/images/error.svg';
import './errorRequest.css';


const ErrorRequest = () => {

    return (
        <div className="errorRequestContainer" >

            <img src={errorImage} alt="error request" />
            <p>There was an error loading the content, please try again later.</p>

        </div>
    );
};


export default ErrorRequest;