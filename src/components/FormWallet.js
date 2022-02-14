import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getExpenseThunk, getCurrency } from '../actions/wallet';

class FormWallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.printForm = this.printForm.bind(this);
    this.currencyExchange = this.currencyExchange.bind(this);
  }

  componentDidMount() {
    this.currencyExchange();
  }

  /*
    Função async para filtrar as chaves da API que serão utilizadas como opção no formulário e também enviando essas chaves para action referente as moedas: getCurrency
  */
  async currencyExchange() {
    const { catchCurrency } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencyKeys = Object.keys(data).filter(
      (currencies) => currencies !== 'USDT',
    );

    this.setState({
      exchangeRates: currencyKeys,
    });
    catchCurrency(currencyKeys);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  /*
    Nesta função async, estou pegando os dados do estado local e enviando a API para a chave exchangeRates, estruturei eles em uma variável para enviar para a action thunk
  */
  async printForm(e) {
    e.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { fetchCurrencyApi } = this.props;

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const exchangeRates = data;

    const states = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    this.setState({ id: id + 1, value: 0 }); // pegando o estado anterior de Id e somando +1
    fetchCurrencyApi(states);
  }

  render() {
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    return (
      <form>
        <label htmlFor="valueExpense">
          Valor
          <input
            id="valueExpense"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="descriptionExpense">
          Descrição
          <input
            id="descriptionExpense"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {exchangeRates.map((options) => (
              <option key={ options }>{options}</option>
            ))}
          </select>
        </label>
        <label htmlFor="paymentMethod">
          <select
            id="paymentMethod"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          <select
            id="category"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.printForm }>
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyApi: (state) => dispatch(getExpenseThunk(state)),
  catchCurrency: (state) => dispatch(getCurrency(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

FormWallet.propTypes = {
  fetchCurrencyApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
