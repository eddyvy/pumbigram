import { types } from "../types/types";


const initialState = {
    logged: false,
    loading: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload
            }

        case types.logout:
            return {
                logged: false
            }
    
        case types.authStartLoading:
            return {
                ...state,
                loading: true
            }

        case types.authFinishLoading:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}