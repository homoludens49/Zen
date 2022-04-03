import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {updatePlusOne, updateMinusOne, deleteProduct} from '../actions/stock'


const Products = ({stock, updatePlusOne, updateMinusOne, deleteProduct}) => {
    const ganibuDambis = stock.filter(g=>g.warehouse === "Ganibu Dambis 40C")
    const omniva = stock.filter(o=>o.warehouse === "Omniva")
    const dpd = stock.filter(h=>h.warehouse === "DPD")
    const deleteButton= (p) =>{
        deleteProduct(p)
    }
    const plusOne = (p) =>{
        updatePlusOne(p)
    }
    const minusOne = (p) =>{
        updateMinusOne(p)
    }

    const productsGD = 
    ganibuDambis.sort(function(a, b) {
        if(a.brand < b.brand) { return -1; }
        if(a.brand > b.brand) { return 1; }
        return 0;
      }).map(p =>(
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
            <td>
                <button 
                className='btn btn-danger'
                onClick={()=> deleteButton(p)}>
                    Delete</button>
            </td>
        </tr>
    ))
    const productsOm = 
    omniva.sort(function(a, b) {
        if(a.brand < b.brand) { return -1; }
        if(a.brand > b.brand) { return 1; }
        return 0;
      }).map(p =>(
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
            <td>
                <button 
                className='btn btn-danger'
                onClick={()=> deleteButton(p)}>
                    Delete</button>
            </td>
        </tr>
    ))
    const productsDpd = 
    dpd.sort(function(a, b) {
        if(a.brand < b.brand) { return -1; }
        if(a.brand > b.brand) { return 1; }
        return 0;
      }).map(p =>(
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
            <td>
                <button 
                className='btn btn-danger'
                onClick={()=> deleteButton(p)}>
                    Delete</button>
            </td>
        </tr>
    ))
    


    return (
        <Fragment>
            <div className="custom-orders">
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Quantity GanibuDambis</th>
                            <th />
                            <th />
                            <th />
                        </tr>
                    </thead>
                <tbody>{productsGD}</tbody>
                </table>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Quantity Omniva</th>
                            <th />
                            <th />
                            <th />
                        </tr>
                    </thead>
                <tbody>{productsOm}</tbody>
                </table>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Model</th>
                            <th>Quantity Home</th>
                            <th />
                            <th />
                            <th />
                        </tr>
                    </thead>
                <tbody>{productsDpd}</tbody>
                </table>
            </div>
        
            
        </Fragment>
    )
}

Products.propTypes = {
    updatePlusOne: PropTypes.func.isRequired,
    updateMinusOne: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
}

export default  connect(null,{updatePlusOne, updateMinusOne, deleteProduct})(Products)
