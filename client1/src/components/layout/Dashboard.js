import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Products from '../Products'
import Totals from '../Totals'
import FileUpload from '../FileUpload'
import stock from '../../reducers/stock';
import {getTotals} from '../../actions/stock'

const Dashboard = ({stock, totals, getTotals}) => {
    useEffect(()=> {
        getTotals()
      }, [])
      
    return (
        <div>
             <h1 className='large text-primary'> Dashboard </h1>
                <p className='lead'>
                    <i className='fas fa-user'></i>Welcome
                </p>
                <FileUpload />
                <Totals totals={totals}></Totals>
                <Products stock = {stock.stock}></Products>
        </div>
    )
}
Dashboard.propTypes = {
    stock: PropTypes.array.isRequired,
    totals: PropTypes.object.isRequired,
    getTotals: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    stock: state.stock,
    totals: state.stock.totals
})

export default connect(mapStateToProps,{getTotals})(Dashboard)