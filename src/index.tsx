import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ReduxStore } from './redux/redux';
import reducer from './reducer'
import { State } from './types'
import { ActionType } from './actions'
import { ReduxProvider } from './redux/react-redux';

const store: ReduxStore<State, ActionType> = new ReduxStore(reducer, { counter: 0, resetCount: 0 })

ReactDOM.render(
    (<ReduxProvider store={store}><App add={3} /></ReduxProvider>),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
