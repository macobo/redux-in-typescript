type Reducer<StateType, ActionType> = (state: StateType, action: ActionType) => StateType

export class ReduxStore<StateType, ActionType> {
    private state: StateType
    private reducer: Reducer<StateType, ActionType>

    constructor(reducer: Reducer<StateType, ActionType>, initialState: StateType) {
        this.state = initialState
        this.reducer = reducer
    }

    dispatch(action: ActionType): void {
        this.state = this.reducer(this.state, action)
    }

    getState(): StateType {
        return this.state
    }
}
