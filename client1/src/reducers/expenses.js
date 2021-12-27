import { GET_EXPENSES, CREATE_EXPENSE, EXPENSE_ERROR } from "../actions/types";

const initialState = {
  expences: { name: "1", vat: true, month: "test", year: "", cost: 0 },

  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXPENSES:
      return {
        ...state,
        expences: payload,
      };
    case CREATE_EXPENSE:
      return {
        ...state,
        expences: payload,
      };
    case EXPENSE_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
