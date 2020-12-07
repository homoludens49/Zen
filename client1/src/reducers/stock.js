import {
    GET_STOCK,
    STOCK_ERROR,
    CLEAR_STOCK,
    UPDATE_STOCK
} from '../actions/types'

const initialState = {
    stock: [{model:1,
    quanity:1,
warehouse:'test'}],
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_STOCK: 
        return{
            ...state,
            stock: payload
        }
        case UPDATE_STOCK: 
        return{
            ...state,
            error: payload
        }
        case STOCK_ERROR:
            return{
                ...state,
                error: payload
            }
        case CLEAR_STOCK:
            return {
                ...state,
                stock: null
            }
        default: 
            return state           
    }

}