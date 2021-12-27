import { GET_ORDERS, GET_STATS, ORDERS_ERROR } from "../actions/types";

const initialState = {
  stats: {
    totalSales: 0.0,
    totalShipping: 0.0,
    totalProducts: 0.0,
    totalOmniva: 0.0,
    totalDPD: 0.0
  },
  orders: 
    [{
      orderId: 1,
      name: 1,
      order: [{ name: "test" }],
      link: { collection: [{ href: "test" }] },
    }],
  

  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case GET_STATS:
      return {
        ...state,
        stats: payload,
      };
    case ORDERS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
