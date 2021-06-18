import { types } from "../types/types"


const initialState = {
    selectedNew: false,
    gridView: false,
    loading: false
}


export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.selectNew:
            return {
                ...state,
                selectedNew: true
            }

        case types.deselectNew:
            return {
                ...state,
                selectedNew: false
            }

        case types.selectGridView:
            return {
                ...state,
                gridView: true
            }

        case types.deselectGridView:
            return {
                ...state,
                gridView: false
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}