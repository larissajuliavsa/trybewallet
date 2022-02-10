// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_USER } from '../actions/user';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
