import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    }

    const authLinks = (
        <Fragment>
                <a onClick={onLogout} href="#!" className="text-center">Logout
                </a>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <Link to="/login" className="text-center">Login</Link>
            <Link to="/register" className="text-center">Register</Link>
        </Fragment>
    );

    return (
        <div class="navbar">
        <Link to="/" className="logo"> </Link>
        <div class="menu">
        {isAuthenticated ? authLinks : guestLinks}
        </div>
        <input id="menu-toggle" className="menu-toggle text-center" type="checkbox" />
        <label htmlFor="menu-toggle">
        <i className="fas fa-bars"></i>
        </label>
        <div className="menu-toggle-items">
        {isAuthenticated ? authLinks : guestLinks}
        </div>
        </div>
    )
}


export default Navbar