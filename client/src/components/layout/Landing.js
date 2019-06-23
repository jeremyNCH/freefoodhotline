import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <Fragment>
        <div className="banner">
        <div className="banner-img text-center"></div>
        <div className="banner-title"><h1>Give unwanted food a second chance.</h1></div>
        <div className="banner-text ">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        <div className="banner-btn text-center">
            <Link href='register'>
            <button className="prim">Donate your food today!</button>
            </Link>
        </div>
        </div>
        </Fragment>
    )
};

export default About;