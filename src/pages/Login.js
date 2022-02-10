import React from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../actions/user';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validationLogin = this.validationLogin.bind(this);
    this.enterLogin = this.enterLogin.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validationLogin());
  }

  /*
    Escrevi validationLogin() com base na mentoria de revisão do bloco 12 feita pelo Moisés Santana
    Regex: https://regexr.com/3e48o
  */

  validationLogin() {
    const { email, password } = this.state;
    const REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const SIX = 6;

    const validateEmail = !REGEX.test(email);
    const validatePassword = password.length < SIX;

    this.setState({
      isDisable: validateEmail || validatePassword,
    });
  }

  enterLogin() {
    const { email } = this.state;
    const { userDispatch, history } = this.props;

    userDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            value={ email }
            placeholder="some@thing.com"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisable }
          onClick={ this.enterLogin }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (state) => dispatch(getUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  userDispatch: PropTypes.func,
  history: PropTypes.func,
}.isRequired;
