import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import roorReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const store = createStore(
    roorReducer, 
    initialState, 
    composeWithDevTools
    (applyMiddleware(...middleware)
    ))

export default store