import React, { Fragment, useEffect, useState, useContext } from 'react';

import EditProfile from './EditProfile';
import NewProfile from './NewProfile';
import AddFood from './AddFood';
import FoodCard from './FoodCard';

import FoodContext from '../../context/food/foodContext';

const Dashboard = props => {
    const foodContext = useContext(FoodContext);

    const [topForm, changeTopForm] = useState('editaddress');

    const { getProfile, profile, loading } = foodContext;

    useEffect(() => {
        getProfile();
    }, []);

    if (profile === null && !loading) {
        return (
            <NewProfile />
        )
    }


    return <Fragment>
        {profile !== null && !loading ? (
            <div>
                {topForm === 'editaddress' ? (
                    <EditProfile address={profile.address} />
                ) : (
                    <AddFood />
                )}
                <button onclick={changeTopForm('editaddress')}> Edit Profile </button>
                <button onclick={changeTopForm('addfood')}> Add Food </button>
                {profile.foods.length > 0 && profile.foods.map(food => (
                    <FoodCard key={food._id} food={food}/>
                ))}
            </div>
        ) : (
            <p> Loading </p>
        )}
    </Fragment>
}

export default Dashboard;