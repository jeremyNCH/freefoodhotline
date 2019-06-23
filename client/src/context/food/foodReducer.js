import { GET_PROFILE, ADD_FOOD, DELETE_FOOD, CLEAR_PROFILE, PROFILE_ERROR, CREATE_PROFILE, UPDATE_PROFILE } from '../types';

export default (state, action) => {
    switch (action.type) {

        case ADD_FOOD:
        case CREATE_PROFILE:
        case DELETE_FOOD:
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
            }

        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state

    }
}