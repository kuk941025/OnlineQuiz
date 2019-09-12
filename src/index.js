import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, responsiveFontSizes, } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Blue from '@material-ui/core/colors/blue'
import LightBlue from '@material-ui/core/colors/lightBlue'
import * as serviceWorker from './serviceWorker';


let theme = createMuiTheme({
    palette: {
        primary: Blue,
        secondary: LightBlue
    }
});
theme = responsiveFontSizes(theme);


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
