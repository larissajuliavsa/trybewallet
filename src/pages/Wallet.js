import React from 'react';
import FormWallet from '../components/FormWallet';
import Header from '../components/Header';

export default class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormWallet />
      </div>
    );
  }
}
