// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_EXPENSE,
  GET_EXPENSE_SUCCESS,
  GET_EXPENSE_FAIL,
  GET_EXPENSE_DELETE,
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
  /*
    Para a ação de deletar uma expense, utilizei como base neste vídeo:
    https://www.youtube.com/watch?v=DZ7AZuii9ZU indianos ❤️
    Em expenses estou filtrando os id's que estou recebendo em state e que sejam diferente do id que action.payload retorna. Ao clicar no botão, permanecerão os id's que são diferentes de action.payload.
  */
  case GET_EXPENSE_DELETE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter(
          (deleteExpense) => deleteExpense.id !== action.payload,
        ),
      ],
    };
  default:
    return state;
  }
};

export default walletReducer;
