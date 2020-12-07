import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Products from '../Products'
import FileUpload from '../FileUpload'
import stock from '../../reducers/stock';


const Dashboard = ({stock}) => {

    return (
        <div>
             <h1 className='large text-primary'> Dashboard </h1>
                <p className='lead'>
                    <i className='fas fa-user'></i>Welcome
                </p>
                <FileUpload />
                <Products stock = {stock.stock}></Products>
        </div>
    )
}
Dashboard.propTypes = {
    stock: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    stock: state.stock
})

export default connect(mapStateToProps)(Dashboard)