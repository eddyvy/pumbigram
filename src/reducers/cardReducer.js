import { types } from "../types/types";

const initialState = {
    cards: []
}

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case types.loadAllCards:
            return {
                ...state,
                cards: action.payload
            }

        case types.updateCard:
            return {
                ...state,
                cards: state.cards.map(
                    card => card.id === action.payload.id 
                        ? action.payload
                        : card
                )
            }

        case types.addCard:
            return {
                ...state,
                cards: [
                    action.payload,
                    ...state.cards
                ]
            }
    
        default:
            return state
    }
}