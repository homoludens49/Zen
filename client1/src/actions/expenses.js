import axios from 'axios';
import {
    GET_EXPENSES,
    CREATE_EXPENSE,
    EXPENSE_ERROR
} from './types'

export const getExpenses = ( ) => async dispatch => {
    try {
        const res = await axios.get('/expenses')
        console.log(res.data)
        dispatch({
            type: GET_EXPENSES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: EXPENSE_ERROR,
            payload: { mgg: err.response.statusText, status: err.response.status}
        })
    }
}
export const createExpense = expense => async dispatch => {
    try {
      
        const res = await axios.post('/expenses', expense)
        dispatch({
            type:CREATE_EXPENSE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: EXPENSE_ERROR,
            payload: { message: err.response.statusText, status: err.response.status}
        })
    }
}