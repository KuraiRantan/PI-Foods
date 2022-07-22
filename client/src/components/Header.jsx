import { Link, NavLink } from "react-router-dom";
import './header.css';
import logoImage from '../assets/media/images/cooking.png'

const Header = () => {
    return (
        <header className="header">
            <div className="logoContainer">
                <img className="logo" src={logoImage} alt="logo" />
                <span>FOOD BOOK</span>
            </div>
            <div className="headerLinks">
                <NavLink exact to='/' activeClassName='active' >HOME</NavLink>
                <NavLink exact to='/recipes' activeClassName='active' >RECIPES</NavLink>
                <NavLink exact to='/recipe/create' activeClassName='active' >CREATE</NavLink>
            </div>
            
        </header>
    );
};


export default Header;