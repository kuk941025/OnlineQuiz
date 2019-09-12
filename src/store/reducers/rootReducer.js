import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import testReducer from './testReducer'


const rootReducer = combineReducers({
    test: testReducer, 
    firebase :firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer