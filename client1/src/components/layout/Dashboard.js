import React, { Component, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Products from "../Products";
import Totals from "../Totals";
import Stats from "../Stats";
import FileUpload from "../FileUpload";
import stock from "../../reducers/stock";
import { getTotals } from "../../actions/stock";
import { getStats } from "../../actions/orders";
import { Button } from "@mui/material";

const Dashboard = ({ stock, totals, stats, getTotals, getStats }) => {
  useEffect(() => {
    getTotals();
    getStats();
  }, []);

  return (
    <div>
      <Button variant="contained" color="secondary">
        Contained
      </Button>
      <h1 className="large text-primary"> Dashboard </h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome
      </p>
      <FileUpload />
      <Totals totals={totals}></Totals>
      <Stats stats={stats} totals={totals}></Stats>
      <Products stock={stock.stock}></Products>
    </div>
  );
};
Dashboard.propTypes = {
  stock: PropTypes.array.isRequired,
  totals: PropTypes.array.isRequired,
  getTotals: PropTypes.func.isRequired,
  getStats: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
  totals: state.stock.totals,
  stats: state.orders.stats,
});

export default connect(mapStateToProps, { getTotals,getStats })(Dashboard);
