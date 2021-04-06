import axios from 'axios';
import {
    GET_ORDERS,
    ORDERS_ERROR
} from './types'

export const getOrders=()=> async dispatch => {
    try {
        const res = await axios.get('/autoorders')
        dispatch({
            type: GET_ORDERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ORDERS_ERROR,
            payload: { mgg: err.response.statusText, status: err.response.status}
        })
    }
}