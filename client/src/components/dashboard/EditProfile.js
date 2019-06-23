import React, { useContext, useState } from 'react';

import FoodContext from '../../context/food/foodContext';

const EditProfile = address_ => {
    const foodContext = useContext(FoodContext);
    const { createProfile } = foodContext;

    const [address, changeAddress] = useState({
        address: address_
    });

    const onChange = e => changeAddress({
        address: [e.target.value]
    });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(address);
    }

    return (
        <div>
            <h1> Need to make a profile fam </h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='address'> Address: </label>
                <input
                    type='text'
                    placeholder='Address'
                    name='address'
                    value={address}
                    onChange={onChange}
                />
                <div>
                    <input
                    type='submit'
                    value='Change'
                    />
                </div>
            </form>
        </div>
    )
}

export default EditProfile;