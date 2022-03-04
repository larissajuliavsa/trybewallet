// Action type

export const GET_EXPENSE = 'GET_EXPENSE';
export const GET_EXPENSE_SUCCESS = 'GET_EXPENSE_SUCCESS';
export const GET_EXPENSE_FAIL = 'GET_EXPENSE_FAIL';
export const GET_EXPENSE_DELETE = 'GET_EXPENSE_DELETE';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_EDITION = 'GET_EDITION';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';

// Action creator

/*
  Com base nas aulas ao vivo e mentorias, criei actions:
  que trata o loading da página - getExpense
  que recebe chaves da API referente as moedas - getCurrency
  que recebe a API e retorna erro, caso houver - getExpenseThunk
*/

export const getExpense = () => ({
  type: GET_EXPENSE,
});

export const getCurrency = (payload) => ({
  type: GET_CURRENCY,
  payload,
});

export const editExpenses = (payload) => ({
  type: EDIT_EXPENSES,
  payload,
});

export const editTableForm = (payload) => ({
  type: GET_EDITION,
  payload,
});

export const getExpenseSuccess = (payload) => ({
  type: GET_EXPENSE_SUCCESS,
  payload,
});

export const getExpenseFail = (payload) => ({
  type: GET_EXPENSE_FAIL,
  payload,
});

export const getExpenseDelete = (payload) => ({
  type: GET_EXPENSE_DELETE,
  payload,
});

export const getExpenseThunk = (state) => async (dispatch) => {
  dispatch(getExpense());
  try {
    dispatch(getExpenseSuccess(state));
  } catch (error) {
    dispatch(getExpenseFail(error));
  }
};
