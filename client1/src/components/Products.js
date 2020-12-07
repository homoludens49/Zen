import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {updatePlusOne, updateMinusOne, deleteProduct} from '../actions/stock'


const Products = ({stock, updatePlusOne, updateMinusOne, deleteProduct}) => {
    const products = stock.map(p =>(
        <tr key={p._id}>
            <td>{p.model}</td>
            <td>{p.quantity}</td>
            <td>
                <button 
                    onClick={() => plusOne(p)}
                    type="button" 
                    className='btn btn-success' 
                >+</button>
            </td>
            <td>
                <button 
                    onClick={() => minusOne(p)}
                    type="button" 
                    className='btn btn-alert'
                >-</button>
            </td>
            <td>{p.warehouse}</td>
            <td>
                <button 
                className='btn btn-danger'
                onClick={()=> deleteButton(p)}>
                    Delete</button>
            </td>
        </tr>
    ))
    const deleteButton= (p) =>{
        deleteProduct(p)
    }
    const plusOne = (p) =>{
        updatePlusOne(p)
    }
    const minusOne = (p) =>{
        updateMinusOne(p)
    }
    return (
        <Fragment>
        <h2 className="my-2">Stock</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Quantity</th>
                        <th />
                        <th />
                        <th>Warehouse</th>
                        <th />
                    </tr>
                </thead>
        <tbody>{products}</tbody>

            </table>
        </Fragment>
    )
}

Products.propTypes = {
    updatePlusOne: PropTypes.func.isRequired,
    updateMinusOne: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
}

export default  connect(null,{updatePlusOne, updateMinusOne, deleteProduct})(Products)
