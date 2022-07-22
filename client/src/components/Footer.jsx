import './footer.css';
import githubImage from '../assets/media/images/github.png';


const Footer = () => {

    return (
        <footer className="footer">
            <a href="https://github.com/KuraiRantan" target="_blank"><img src={githubImage} alt="" /></a>
        </footer>
    );
};

export default Footer;