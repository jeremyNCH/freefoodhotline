import React, { useReducer } from 'react';
import axios from 'axios';
import foodReducer from './foodReducer';
import FoodContext from './foodContext';

import { GET_FOODS, ADD_FOOD, DELETE_FOOD, CLEAR_FOODS } from '../types';

const FoodState = props => {
    const initialState = {
        foods: null,
        error: null
    }

    const [state, dispatch] = useReducer(foodReducer, initialState);

    // Get foods

    // Add food

    // Delete food
    
    // Clear foods
    const clearCurrent = () => {
        dispatch({ type: CLEAR_FOODS });
    }
}