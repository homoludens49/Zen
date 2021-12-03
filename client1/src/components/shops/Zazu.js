import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Invoice from '../Invoice'
const Zazu = ({orders}) => {
    const zzOrders = orders.filter(x => x.link.collection[0].href === "https://www.zazu-kids.lv/wp-json/wc/v2/orders"? true:false)
    zzOrders.sort((a,b) =>  b.orderId-a.orderId)
    const zazuOrders = zzOrders.map(o => (
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
        <tbody>{zazuOrders}</tbody>
            </table>
    </Fragment>
    )
}

export default Zazu