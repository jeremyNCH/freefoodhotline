import React, { useContext, useState } from 'react';

import FoodContext from '../../context/food/foodContext';

const NewProfile = () => {
    const foodContext = useContext(FoodContext);
    const { createProfile } = foodContext;

    const [address, changeAddress] = useState({
        address: ''
    });

    const onChange = e => changeAddress({
        address: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(address);
    }

    return (
        <div>
            <h1> Need to make a profile fam </h1>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Address'
                    name='address'
                    value={address.address}
                    onChange={onChange}
                />
                <div>
                    <input
                    type='submit'
                    value='Create'
                    />
                </div>
            </form>
        </div>
    )
}

export default NewProfile;