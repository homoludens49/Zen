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
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const StockOverview = ({ totals }) => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));


  return (
    <Fragment>
      <Grid item xs={12} sm={4}>
        <Item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item>Stock Overview</Item>
            </Grid>
            <Grid container item xs={12} sm={6} direction="row">
              <Grid
                container
                item
                xs={12}
                sm={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h1" component="div">
                  <Inventory2Icon sx={{ fontSize: 64 }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Stock
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5, fontSize: 52 }}
                    color="text.secondary"
                  >
                    {totals[0].quantity}
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
                xs={12}
                sm={6}
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
                    Total Stock in Cash Purchase
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5, fontSize: 36 }}
                    color="text.secondary"
                  >
                    {totals.totalStockInCashPurchase}
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
                xs={12}
                sm={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h1" component="div">
                  <AllInboxIcon sx={{ fontSize: 64 }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Stock in Omniva
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5, fontSize: 36 }}
                    color="text.secondary"
                  >
                    {totals.totalStockInCashPurchase}
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
                xs={12}
                sm={6}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h1" component="div">
                  <AllInboxIcon sx={{ fontSize: 64 }} />
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Total Stock in DPD
                  </Typography>

                  <Typography
                    sx={{ mb: 1.5, fontSize: 36 }}
                    color="text.secondary"
                  >
                    {totals.totalStockInCashPurchase}
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

export default StockOverview;
