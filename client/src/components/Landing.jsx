import landingImage from "../assets/media/images/landing-food.webp";
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <main className="mainLanding">
            <img src={landingImage} alt="food image" />
            <div className="centerInImage">
                <p>Welcome to <span>Food Book</span> where you will find endless recipes and why not, you can create your own.</p>
                <Link to="/recipes">GET STARTED</Link>
            </div>
        </main>
    );
};


export default Landing;