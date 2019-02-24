type Reducer<StateType, ActionType> = (state: StateType, action: ActionType) => StateType

export class ReduxStore<StateType, ActionType> {
    private state: StateType
    private reducer: Reducer<StateType, ActionType>
    private subscriptionIndex: number
    private subscriptions: { [i: number]: () => void }

    constructor(reducer: Reducer<StateType, ActionType>, initialState: StateType) {
        this.state = initialState
        this.reducer = reducer
        this.subscriptionIndex = 0
        this.subscriptions = {}
    }

    dispatch(action: ActionType): void {
        this.state = this.reducer(this.state, action)

        for (let key in this.subscriptions) {
            this.subscriptions[key]()
        }
    }

    getState(): StateType {
        return this.state
    }

    subscribe(fn: () => void): number {
        this.subscriptions[this.subscriptionIndex] = fn
        return this.subscriptionIndex++
    }

    unsubscribe(index: number) {
        delete this.subscriptions[index]
    }
}
