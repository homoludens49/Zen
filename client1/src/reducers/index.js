import { combineReducers } from 'redux'
import stock from './stock'
import orders from './orders'
import expenses from './expenses'



export default combineReducers({
    stock,
    orders,
    expenses
})