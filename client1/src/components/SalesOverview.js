import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SavingsIcon from '@mui/icons-material/Savings';
const SalesOverview = ({ stats }) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Fragment>
      <Grid item xs={0} sm={2}>
        {" "}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>Sales Overview</Item>
            </Grid>
            <Grid container item xs={12} sm={6} direction="row">
              <Grid
                container
                item
                xs={12} sm={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h1" component="div">
                  <PointOfSaleIcon sx={{ fontSize: 64 }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Orders
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5, fontSize: 52 }}
                    color="text.secondary"
                  >
                    {stats.totalOmniva + stats.totalDPD}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={6} direction="row">
              <Grid
                container
                item
                xs={12} sm={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h1" component="div">
                  <AttachMoneyIcon sx={{ fontSize: 64 }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Revenue
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5, fontSize: 36 }}
                    color="text.secondary"
                  >
                    {stats.totalSales}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={6} direction="row">
              <Grid
                container
                item
                xs={12} sm={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h1" component="div">
                  <SavingsIcon sx={{ fontSize: 64 }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Profit
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5, fontSize: 36 }}
                    color="text.secondary"
                  >
                    {stats.totalSales-stats.totalShipping}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={6} direction="row">
              <Grid
                container
                item
                xs={12} sm={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h1" component="div">
                  <MonetizationOnIcon sx={{ fontSize: 64 }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography
                  
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Costs
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5, fontSize: 36 }}
                    color="text.secondary"
                  >
                    {stats.totalShipping}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </Fragment>
  );
};

export default SalesOverview;
