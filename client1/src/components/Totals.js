import React, { Fragment } from 'react'

const Totals = ({totals}) => {
   

    return (
        <Fragment>
            
            <h1>Totals</h1>
        <div class="cotainer ">
            <div class="row">
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock Quantity</h6>
                        <p class="card-text">{totals[0].quantity}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock in Cash Retail</h6>
                        <p class="card-text">EUR {totals[0].sellprice.toFixed(2)}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Total Stock in Cash Purchase</h6>
                        <p class="card-text">EUR {totals[0].buyprice.toFixed(2)}</p>
                    </div>
                </div>
            </div>    
            <div class="row">
                <div class="col">
                    <div>
                        <h6 class="card-title"></h6>
                        <p class="card-text"></p>
                    </div>
                </div>
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">Retail Revenue without VAT</h6>
                        <p class="card-text">EUR {totals[0].revenueNoVat.toFixed(2)}</p>
                    </div>
                </div>
                <div class="col">
                    <div class="card border-info mb-3 mt-2">
                        <h6 class="card-title">VAT</h6>
                        <p class="card-text">EUR {(totals[0].sellprice - totals[0].revenueNoVat).toFixed(2)}</p>
                    </div>
                </div>
            </div>
            </div>

            
        </Fragment>
    )
}

export default Totals
