import React, { createContext, Context, ComponentType } from "react"
import { ReduxStore } from "./redux"
import { Subtract } from "utility-types"

const ReduxContext: Context<any> = createContext(null)

export function Provider<StateType, ActionType>(
    props: {
        store: ReduxStore<StateType, ActionType>,
        children: any,
    }
) {
    return <ReduxContext.Provider value={props.store}>{props.children}</ReduxContext.Provider>
}

export function connect<
    StateType,
    ActionType,
    ReduxStateProps extends Object,
    ReduxActionProps extends Object,
    Props extends ReduxStateProps & ReduxActionProps
>(
    mapStateToProps: (
        state: StateType,
        ownProps: Subtract<Props, ReduxStateProps & ReduxActionProps>
    ) => ReduxStateProps,
    mapDispatchToProps: (dispatch: ((action: ActionType) => void)) => ReduxActionProps,
    UnconnectedComponent: ComponentType<Props>,
): any {
    const renderWithStore = (storeValue: any) => (ownProps: Subtract<Props, ReduxStateProps & ReduxActionProps>) => {
        if (!(storeValue instanceof ReduxStore)) {
            throw new Error("No/invalid store provided")
        }
        const store = storeValue as ReduxStore<StateType, ActionType>

        const stateProps: ReduxStateProps = mapStateToProps(store.getState(), ownProps)
        const dispatchProps: ReduxActionProps = mapDispatchToProps(store.dispatch.bind(store))

        const props = { ...ownProps, ...stateProps, ...dispatchProps } as Props
        return <UnconnectedComponent {...props} />
    }

    return (
        <ReduxContext.Consumer>{renderWithStore}</ReduxContext.Consumer>
    )
}
