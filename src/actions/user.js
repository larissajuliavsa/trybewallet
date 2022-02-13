// Action type
export const GET_USER = 'GET_USER';

// Action creator
export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});
