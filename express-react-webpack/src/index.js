import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./App.jsx";
import {Provider} from 'react-redux';
import {store} from './store/configureStore';
import rootSaga from "./sagas/rootSaga";
import {
    BrowserRouter as Router,
} from "react-router-dom";

store.runSaga(rootSaga)

const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};

export const ThemeContext = React.createContext(themes.light);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ThemeContext.Provider value={themes.dark}>
                <App/>
            </ThemeContext.Provider>
        </Router>
    </Provider>,
    document.getElementById('app'));