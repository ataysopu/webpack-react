import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./App.jsx";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
        <Router>
            <ThemeContext.Provider value={themes.dark}>
                <App/>
            </ThemeContext.Provider>
        </Router>
    </QueryClientProvider>,
    document.getElementById('app'));