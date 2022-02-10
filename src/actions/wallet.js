// import { futuraAPI } from 'futuraApi'

// Action type
export const GET_WALLET = 'GET_WALLET';
export const GET_WALLET_SUCCESS = 'GET_WALLET_SUCCESS';
export const GET_WALLET_FAIL = 'GET_WALLET_FAIL';

// Action creator

/*
  Trazer actions com ações para loading, fetch e erro
*/

export const getWallet = () => ({
  type: GET_WALLET,
});

export const getWalletSuccess = () => ({
  type: GET_WALLET_SUCCESS,
});

export const getWalletFail = () => ({
  type: GET_WALLET_FAIL,
});
