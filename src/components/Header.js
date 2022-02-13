import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpense = () => {
    const { expenses } = this.props;

    const total = expenses.reduce((acc, totalExpense) => {
      acc
        += totalExpense.exchangeRates[totalExpense.currency].ask
        * totalExpense.value;
      return acc;
    }, 0);

    return total.toFixed(2);
    // return total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    /*
      Para deixar o valor total no formato moeda, encontrei este link com a dica da função toLocaleString():
      https://www.blogson.com.br/formatar-moeda-dinheiro-com-javascript-do-jeito-facil/#:~:text=formatando%20Moeda%2C%20Dinheiro%20usando%20toLocaleString,fun%C3%A7%C3%A3o%20nativa%20do%20pr%C3%B3prio%20JavaScript.
    */
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p>
            Total Expense:
            {' '}
            <span data-testid="total-field">{this.totalExpense()}</span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
