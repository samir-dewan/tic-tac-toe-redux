import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {Provider} from "react-redux";
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from '../redux';
import logger from "redux-logger";
import Game from '../containers/Game';
import Home from '../containers/Home';
import './app.css';


const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                        <Switch>
                            <Route path="/" exact>
                                <Home />    
                            </Route>
                            <Route path="/game" exact>
                                <Game />    
                            </Route>
                        </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;