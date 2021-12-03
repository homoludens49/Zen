import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
       <ul>
           <li>
             <Link to="/" className="nav-link">
                 Dashboard
             </Link>  
           </li>
           <li>
             <Link to="orders" className="nav-link">
                 Orders
             </Link>  
           </li>
           <li>
             <Link to="movements" className="nav-link">
                 Movements
             </Link>  
           </li>
           <li>
             <Link to="products" className="nav-link">
                 Products
             </Link>  
           </li>
           <li>
             <Link to="metrics" className="nav-link">
                 Metrics
             </Link>  
           </li>
       </ul>
    )
}

export default Nav