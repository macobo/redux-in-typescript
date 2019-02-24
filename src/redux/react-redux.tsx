import React, { createContext, Context, ComponentType, FunctionComponent, PureComponent } from "react"
import { ReduxStore } from "./redux"
import { Subtract } from "utility-types"

const ReduxContext: Context<any> = createContext(null)

export function ReduxProvider<StateType, ActionType>(
    props: {
        store: ReduxStore<StateType, ActionType>,
        children?: any,
    }
) {
    return (<div><ReduxContext.Provider value={props.store}>{props.children}</ReduxContext.Provider></div>)
}

export function connect<
    StateType,
    ActionType,
    ReduxStateProps extends Object,
    ReduxActionProps extends Object,
    Props extends ReduxStateProps & ReduxActionProps & { children?: any }
>(
    mapStateToProps: (
        state: StateType,
        ownProps: Subtract<Props, ReduxStateProps & ReduxActionProps>
    ) => ReduxStateProps,
    mapDispatchToProps: (dispatch: ((action: ActionType) => void)) => ReduxActionProps,
    UnconnectedComponent: ComponentType<Props>,
) {
    type ReduxProps = ReduxStateProps & ReduxActionProps
    type OwnProps = Subtract<Props, ReduxProps>

    const renderWithStore = (storeValue: any, props: OwnProps) => {
        if (!(storeValue instanceof ReduxStore)) {
            throw new Error("No/invalid store provided")
        }
        const store = storeValue as ReduxStore<StateType, ActionType>

        const reduxProps = (ownProps: OwnProps) => ({
            ...mapStateToProps(store.getState(), ownProps),
            ...mapDispatchToProps(store.dispatch.bind(store)),
        })

        class ConnectedComponent extends PureComponent<OwnProps, ReduxProps> {
            subscriptionIndex: number

            constructor(props: OwnProps) {
                super(props)
                this.state = reduxProps(props)
                this.subscriptionIndex = store.subscribe(this.updateState)
            }

            updateState = () => {
                this.setState(reduxProps(this.props))
            }

            componentWillUnmount() {
                store.unsubscribe(this.subscriptionIndex)
            }

            getProps(): Props {
                return { ...this.props, ...this.state } as Props
            }

            render() {
                return (
                    <UnconnectedComponent {...this.getProps()}>
                        {this.props.children}
                    </UnconnectedComponent>
                )
            }
        }

        return <ConnectedComponent {...props} />
    }

    return (props: OwnProps) => (<ReduxContext.Consumer>{(store: any) => renderWithStore(store, props)}</ReduxContext.Consumer>)
}
