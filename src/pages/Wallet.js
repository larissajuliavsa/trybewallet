import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FormWallet from '../components/FormWallet';
import TableWallet from '../components/TableWallet';

class Wallet extends React.Component {
  render() {
    const { edit, editTable = {} } = this.props;
    const { value, description, currency, method, tag } = editTable;
    return (
      <div>
        <Header />
        {edit && (
          <FormWallet
            value={ value }
            description={ description }
            currency={ currency }
            method={ method }
            tag={ tag }
            edit
          />
        )}
        {!edit && <FormWallet />}
        <TableWallet />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  edit: state.wallet.edit,
  editTable: state.wallet.editTable,
});

Wallet.propTypes = {
  edit: PropTypes.bool,
  editTable: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
