// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_EXPENSE,
  GET_EXPENSE_SUCCESS,
  GET_EXPENSE_FAIL,
  GET_CURRENCY,
} from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_EXPENSE:
    return {
      ...state,
      loading: true,
    };
  case GET_EXPENSE_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      loading: false,
      error: '',
    };
  case GET_EXPENSE_FAIL:
    return {
      ...state,
      loading: false,
      error: 'A API Quebrou',
    };
  default:
    return state;
  }
};

export default walletReducer;
