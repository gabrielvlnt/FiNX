import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
            <nav className={`${styles.nav} navbar navbar-expand-lg`}>
                <div className={`${styles.backnav} container-fluid`}>
                    <a className={`${styles.logo} navbar-brand me-1 ms-2`} href="#">FiNX</a>
                        <div className="navbar-nav mx-auto">
                            <NavLink className={`${styles.links} nav-link`} to="/">Home</NavLink>
                            <NavLink className={`${styles.links} nav-link`} to="/about">About</NavLink>
                            <NavLink className={`${styles.links} nav-link`} to="/contact">Contact</NavLink>
                        </div>
                        <NavLink className={`btn ${styles.navbutton} me-3`} to="/login">Login</NavLink>
                        <NavLink className={`btn ${styles.navbutton}`} to="/register">Register</NavLink>
                </div>
            </nav>
    );
};  

export default Navbar;