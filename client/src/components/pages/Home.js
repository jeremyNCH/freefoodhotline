import React, { useContext, useEffect } from 'react';


import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();

        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <h1> Dashboard </h1>

        </div>
    )
};

export default Home;