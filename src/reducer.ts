import { State } from "./types"
import { ActionType } from "./actions"
import { combineReducers } from "./redux/redux"

export function counter(state: number, action: ActionType): number {
    switch(action.type) {
        case 'INCREMENT_COUNTER':
            return state + 1
        case 'DECREMENT_COUNTER':
            return state - 1
        case 'RESET_COUNTER':
            return 0
        default:
            return state
    }
}

export function resetCount(state: number, action: ActionType): number {
    switch(action.type) {
        case 'RESET_COUNTER':
            return state + 1
        default:
            return state
    }
}

export default combineReducers<State, ActionType>({ counter, resetCount })
