import React, { useReducer } from 'react';
import axios from 'axios';
import foodReducer from './foodReducer';
import FoodContext from './foodContext';
import history from '../../components/history';

import { CHECK_PROFILE, GET_PROFILE, ADD_FOOD, DELETE_FOOD, CLEAR_PROFILE, PROFILE_ERROR, CREATE_PROFILE } from '../types';

const FoodState = props => {
    const initialState = {
        profile: null,
        error: null
    }

    const [state, dispatch] = useReducer(foodReducer, initialState);


    // Get profile
    const getProfile = async () => {
        try {
            const res = await axios.get('/api/profile/me')

            dispatch({ type: GET_PROFILE, payload: res.data });
        } catch (err) {
            dispatch({ type: PROFILE_ERROR, payload: err.response.msg });
        }
    }

    // Create profile
    const createProfile = async profile_ => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const res = await axios.post('api/profile', { profile: profile_ }, config);

            dispatch({ type: CREATE_PROFILE, payload: res.data });

            history.push('/dashboard');

        } catch (err) {
            dispatch({ type: PROFILE_ERROR, payload: err.response.msg });
        }
    }

    // Add food
    const addFood = async food => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const res = await axios.put('/api/profile/food', food, config);

            dispatch({
                type: ADD_FOOD,
                payload: res.data
            });

        } catch (err) {

            dispatch({
                type: PROFILE_ERROR,
                payload: err.response.msg
            });

        }
    }


    // Delete food
    const deleteFood = async id => {
        try {
            const res = await axios.delete(`api/profile/food/${id}`);

            dispatch({
                type: DELETE_FOOD,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: err.response.msg
            })
        }
    }
    
    // Clear foods
    const clearCurrent = () => {
        dispatch({ type: CLEAR_PROFILE });
    }

    return (
        <FoodContext.Provider value={{
            profile: state.profile,
            error: state.error,
            getProfile,
            createProfile,
            addFood,
            deleteFood,
            clearCurrent
        }}>
            {props.children}
        </FoodContext.Provider>
    )
}

export default FoodState;