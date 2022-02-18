import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
    return (
        <nav className="nav">
            <NavLink to="/" className={({isActive}) => isActive?'activeLink': 'link'}>Home</NavLink>
            <NavLink to="/movies" className={({isActive}) => isActive?'activeLink': 'link'}>Movies</NavLink>
        </nav>
    )
}