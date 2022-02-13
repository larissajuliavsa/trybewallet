import React from 'react';
import Header from '../components/Header';
import FormWallet from '../components/FormWallet';
import TableWallet from '../components/TableWallet';

export default class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormWallet />
        <TableWallet />
      </div>
    );
  }
}
