import React, { useContext, useState } from 'react';

import FoodContext from '../../context/food/foodContext';

const AddFood = () => {
    const foodContext = useContext(FoodContext);
    const { addFood } = foodContext;

    const [food, changeFood] = useState({
        description: '',
        quantity: '',
        expiry: ''
    });

    const { description, quantity, expiry } = food;

    const onChange = e => changeFood({
        ...food,
        [e.target.name]: [e.target.value]
    });

    const onSubmit = e => {
        e.preventDefault();
        addFood(food);
    }

    return (
        <div>
            <h1> Need to make a profile fam </h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='description'> Description: </label>
                <input
                    type='text'
                    placeholder='description'
                    name='description'
                    value={description}
                    onChange={onChange}
                />
                <label htmlFor='quantity'> Quantity: </label>
                <input
                    type='text'
                    placeholder='description'
                    name='quantity'
                    value={quantity}
                    onChange={onChange}
                />
                <label htmlFor='expiry'> Expiry: </label>
                <input
                    type='text'
                    placeholder='expiry'
                    name='expiry'
                    value={expiry}
                    onChange={onChange}
                />
                <div>
                    <input
                    type='submit'
                    value='Add'
                    />
                </div>
            </form>
        </div>
    )
}

export default AddFood;