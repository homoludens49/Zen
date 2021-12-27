import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOrders } from "../actions/orders";

import Smartmom from "../components/shops/Smartmom";
import Alilo from "../components/shops/Alilo";

const Orders = ({ orders, getOrders}) => {
  useEffect(() => {
    getOrders();
  }, []);



  return (
    <Fragment>
      <h2 className="my-2">Orders</h2>
      <div className="custom-orders">
        <h1>Smartmom</h1>
        <h1>Alilo</h1>
      </div>

      <div className="custom-orders">
        <Smartmom orders={orders.orders} />
        <Alilo orders={orders.orders} />
      </div>
    </Fragment>
  );
};

Orders.propTypes = {
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps, { getOrders })(Orders);
