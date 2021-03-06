import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import testReducer from './testReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'
import resultReducer from './resultReducer'

const rootReducer = combineReducers({
    test: testReducer, 
    firebase :firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    user: userReducer, 
    result: resultReducer, 
})

export default rootReducer