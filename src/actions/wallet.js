// Action type

export const GET_EXPENSE = 'GET_EXPENSE';
export const GET_EXPENSE_SUCCESS = 'GET_EXPENSE_SUCCESS';
export const GET_EXPENSE_FAIL = 'GET_EXPENSE_FAIL';
export const GET_CURRENCY = 'GET_CURRENCY';

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

export const getExpenseSuccess = (payload) => ({
  type: GET_EXPENSE_SUCCESS,
  payload,
});

export const getExpenseFail = (payload) => ({
  type: GET_EXPENSE_FAIL,
  payload,
});

export const getExpenseThunk = (object) => async (dispatch) => {
  dispatch(getExpense());
  try {
    dispatch(getExpenseSuccess(object));
  } catch (error) {
    dispatch(getExpenseFail(error));
  }
};
