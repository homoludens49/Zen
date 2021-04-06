import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Invoice from '../Invoice'

const Smartmom = ({orders}) => {
    const smOrders = orders.filter(x => x.link.collection[0].href === "https://smartmom.shop/wp-json/wc/v2/orders"? true:false)
    smOrders.sort((a,b) =>  b.orderId-a.orderId)
    const smartmomOrders = smOrders.map(o => (
        <tr key={o._id}>
        <td>{o.orderId}</td>
        <td>{o.name}</td>
        <td>{o.order[0].name}</td>
        <Link to={{pathname: '/invoice',
        state: o}}>Show Invoice</Link>
    </tr>
    ))

    return (
    <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Items</th>
                        <th/>
                    </tr>
                </thead>
        <tbody>{smartmomOrders}</tbody>
            </table>
    </Fragment>
    )
}

export default Smartmom