import React, { useContext } from 'react'

import FoodContext from '../../context/food/foodContext';

const FoodCard = ({ food }) => {
    const foodContext = useContext(FoodContext);
    const { deleteFood } = foodContext;

    const { description, quantity, expiry, _id } = food;

    const onDelete = e => {
        deleteFood(_id);
    }

    return (
        <div>
            <h1> Description : { description }</h1>
            <h1> quantity : { quantity } </h1>
            <h1> expiry : { expiry } </h1>
            <button onClick={onDelete}> X </button>
            
        </div>
    )
}

export default FoodCard;