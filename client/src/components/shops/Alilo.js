import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Invoice from '../Invoicealilo'

const Alilo = ({orders}) => {
    
    const alOrders = orders.filter(x => x.link.collection[0].href === "https://alilo.lv/wp-json/wc/v2/orders"? true:false)
    alOrders.sort((a,b) =>  b.orderId-a.orderId)
    const aliloOrders = alOrders.map(o => (
        <tr key={o._id}>
        <td>{o.orderId}</td>
        <td>{o.name}</td>
        <td>{o.order[0].name}</td>
        <Link to={{pathname: '/invoicealilo',
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
        <tbody>{aliloOrders}</tbody>
            </table>
    </Fragment>
    )
}

export default Alilo