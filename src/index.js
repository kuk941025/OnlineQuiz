import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, responsiveFontSizes, } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import Blue from '@material-ui/core/colors/blue'
import LightBlue from '@material-ui/core/colors/lightBlue'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { reactReduxFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import fbConfig from './config/fbConfig'


let theme = createMuiTheme({
    palette: {
        primary: Blue,
        secondary: LightBlue
    }
});
theme = responsiveFontSizes(theme);

const firebaseConfig = {};
const rrfConfig = {
    userProfile: 'users'
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(fbConfig, rrfConfig),
    reduxFirestore(fbConfig)
)(createStore);

const store = createStoreWithFirebase(rootReducer);
console.log(store.dispatch);







ReactDOM.render(
    <Provider store={store}>

        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>


    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
