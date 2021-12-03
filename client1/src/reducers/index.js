import { combineReducers } from 'redux'
import stock from './stock'
import orders from './orders'



export default combineReducers({
    stock,
    orders
})