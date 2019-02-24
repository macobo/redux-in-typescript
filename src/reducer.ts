import { State } from "./types"
import { ActionType } from "./actions"

export default function reducer(state: State, action: ActionType): State {
    switch(action.type) {
        case 'INCREMENT_COUNTER':
            return { ...state, counter: state.counter + 1 }
        case 'DECREMENT_COUNTER':
            return { ...state, counter: state.counter - 1 }
        case 'RESET_COUNTER':
            return { counter: 0, resetCount: state.resetCount + 1 }
        // Note: Not actually needed
        default:
            return state
    }
}
