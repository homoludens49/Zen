import axios from 'axios';
import {
    GET_STOCK,
    STOCK_ERROR,
    UPDATE_STOCK
} from './types'

export const getStock = ( ) => async dispatch => {
    try {
        const res = await axios.get('/products')
        dispatch({
            type: GET_STOCK,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: STOCK_ERROR,
            payload: { mgg: err.response.statusText, status: err.response.status}
        })
    }
}

export const updatePlusOne = p => async dispatch => {
    try {
        const res = await axios.post('/products/updatePlusOne', p)
        dispatch({
            type:UPDATE_STOCK,
            payload:{ message: res.data.message}
        })
    } catch (err) {
        dispatch({
            type: STOCK_ERROR,
            payload: { message: err.response.statusText, status: err.response.status}
        })
    }
}

export const updateMinusOne = p => async dispatch => {
    try {
        const res = await axios.post('/products/updateMinusOne', p)
        dispatch({
            type:UPDATE_STOCK,
            payload:{ message: res.data.message}
        })
    } catch (err) {
        dispatch({
            type: STOCK_ERROR,
            payload: { message: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteProduct = p => async dispatch => {
    try {
        const res = await axios.delete(`/products/delete`, p)
        dispatch({
            type: UPDATE_STOCK,
            payload:{message: res.data.message}
        })
    } catch (err) {
        dispatch({
            type: STOCK_ERROR,
            payload: { message: err.response.statusText, status: err.response.status}
        })
    }
}