import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SalesOverview from "./SalesOverview";
import SalesMonthlyOverview from "./SalesMonthlyOverview";
import SalesYearlyOverview from "./SalesYearlyOverview";
import StockOverview from "./StockOverview";

const Stats = ({ stats, totals }) => {
  return (
    <Fragment>
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={4}>
          <SalesOverview stats={stats} />
          <StockOverview totals={totals} />
        </Grid>
        <Grid container spacing={4}>
          <SalesMonthlyOverview stats={stats} />
          <SalesYearlyOverview stats={stats} />
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Stats;
