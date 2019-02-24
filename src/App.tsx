import React, { PureComponent } from 'react';
import logo from './logo.svg';
import './App.css';
import { State } from './types';
import { resetCounter, incrementCounter, decrementCounter, ActionType } from './actions';
import { connect } from './redux/react-redux';

type Props = {
  add: number,
  counter: number,
  addCounter: number,
  resetCount: number,
  resetCounter: () => void,
  incrementCounter: (i: number) => void,
  decrementCounter: (i: number) => void,
}

class App extends PureComponent<Props> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React!
          </a>
          <p>Count: {this.props.counter}</p>
          <p>Multiplied: {this.props.addCounter}</p>
          <p>Resets: {this.props.resetCount}</p>

          <button onClick={() => this.props.incrementCounter(this.props.add)}>+</button>
          <button onClick={() => this.props.decrementCounter(this.props.add)}>-</button>
          <button onClick={this.props.resetCounter}>Reset</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: { add: number }) => ({
  counter: state.counter,
  resetCount: state.resetCount,
  addCounter: ownProps.add * 100 + state.counter,
})

const mapDispatchToProps = (dispatch: (action: ActionType) => void) => ({
  resetCounter: () => dispatch(resetCounter()),
  incrementCounter: (n: number) => dispatch(incrementCounter(n)),
  decrementCounter: (n: number) => dispatch(decrementCounter(n)),
})

export default connect(mapStateToProps, mapDispatchToProps, App);
