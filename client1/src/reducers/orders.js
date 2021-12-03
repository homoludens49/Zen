import {
    GET_ORDERS,
    ORDERS_ERROR
} from '../actions/types'

const initialState = {
    orders: [{orderId:1,
    name:1,
    order:[ {name: 'test'}],
    link: {collection: [{href:'test'}]},
    }],
    
    error: {}
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case GET_ORDERS: 
        return{
            ...state,
            orders: payload
        }
        case ORDERS_ERROR: 
        return{
            ...state,
            error: payload
        }
        default: 
        return state 
    }
}
