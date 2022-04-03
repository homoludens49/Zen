import axios from "axios";
import { GET_ORDERS, GET_STATS, ORDERS_ERROR } from "./types";

export const getOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/autoorders");
    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getStats = () => async (dispatch) => {

  try {
    const res = await axios.get("/calculations/stats");
 
    dispatch({
      type: GET_STATS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
