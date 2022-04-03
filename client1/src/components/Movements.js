import React, {  useEffect , useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStock } from "../actions/stock";


import { styled } from "@mui/material/styles";



import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Movements = ({stock, getStock}) => {

  const warehouses = [
    { label: "Ganibu Dambis 40C" },
    { label: "Omniva" },
    { label: "DPD" },
    { label: "Home" },
  ];
  useEffect(()=> {
      getStock()
  }, [])

  //list all product models from stock  const product = [{ label: stock.model}] key productId
    const product = stock.map((p, _id) => ({ label: p.model }));

  return (
    <Fragment>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            From
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={warehouses}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="From Warehouse" />
            )}
          />
   {' '}  To  {' '}
<Autocomplete
            disablePortal
            id="combo-box-demo"
            options={warehouses}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="To Warehouse" />
            )}
          />
        </Grid>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={product}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Product" />
            )}
          />
      </Box>
    </Fragment>
  );
};

Movements.propTypes = {
    getStock: PropTypes.func.isRequired,
  stock: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  stock: state.stock.stock,
});

export default connect(mapStateToProps, { getStock })(Movements);
