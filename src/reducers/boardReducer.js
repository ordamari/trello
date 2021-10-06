import { boardService } from '../services/boardService';


const initialState = {
    board: boardService.getEmptyBoard()
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return {
                ...state,
                board: action.board
            }
        default:
            return state
    }
}