// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { GET_WALLET } from '../actions/wallet';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

/*
  Trazer reducers com ações para loading, fetch e erro
*/

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case nome da action
  default:
    return state;
  }
};

export default walletReducer;
