import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getExpenseThunk, getCurrency, editExpenses } from '../actions/wallet';
import '../assets/FormWallet.css';
import 'bulma/css/bulma.css';

const ALIMENTACAO = 'Alimentação';

// Eu quis fazer o requisito 9 para deixar a aplicação mais funcional e para aprender como funciona o código em relação a edição de forms, fiz com a ajuda do Matheus Ferreira e Lucas Petzinger

class FormWallet extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: 0,
      value: props.value,
      description: props.description,
      currency: props.currency,
      method: props.method,
      tag: props.tag,
      // edit: props.edit,
    };

    this.handleChange = this.handleChange.bind(this);
    this.printForm = this.printForm.bind(this);
    this.currencyExchange = this.currencyExchange.bind(this);
  }

  componentDidMount() {
    this.currencyExchange();
  }

  editForm = () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, editTable, getNewExpenses } = this.props;
    const { id, exchangeRates } = editTable;
    const newState = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    const findId = expenses.findIndex((find) => find.id === editTable.id);
    const newArray = [...expenses];
    newArray.splice(findId, 1, newState);
    getNewExpenses(newArray);
  };

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
    const { fetchCurrencyApi, expenses } = this.props;

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const exchangeRates = data;

    const states = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    this.setState({
      id: id + 1, // pegando o estado anterior de Id e somando +1
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });
    fetchCurrencyApi(states);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { edit } = this.props;
    const currencyTest = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ];
    return (
      <div className="container-form-table">
        <form className="container-form-expenses">
          <label htmlFor="valueExpense">
            <p className="expense-label">Valor</p>
            <input
              className="expense-value"
              id="valueExpense"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="descriptionExpense">
            <p className="expense-label">Descrição</p>
            <input
              className="expense-description"
              id="descriptionExpense"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label className="select is-small" htmlFor="currency">
            <p className="expense-label">Moeda</p>
            <select
              className="expense-currencies"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {currencyTest.map((options) => (
                <option key={ options }>{options}</option>
              ))}
            </select>
          </label>
          <label className="select is-small" htmlFor="paymentMethod">
            <p className="expense-label">Pagamento</p>
            <select
              className="expense-method"
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
          <label className="select is-small" htmlFor="category">
            <p className="expense-label">Categoria</p>
            <select
              className="expense-categories"
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
          <button
            className="expense-btn"
            type="button"
            onClick={ edit ? this.editForm : this.printForm }
          >
            {edit ? 'Edit' : 'Add'}
          </button>
        </form>
      </div>
    );
  }
}

FormWallet.defaultProps = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: ALIMENTACAO,
  edit: false,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyApi: (state) => dispatch(getExpenseThunk(state)),
  catchCurrency: (state) => dispatch(getCurrency(state)),
  getNewExpenses: (state) => dispatch(editExpenses(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editTable: state.wallet.editTable,
});

FormWallet.propTypes = {
  fetchCurrencyApi: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
