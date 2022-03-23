import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../actions/user';
import Logo from '../assets/logo.svg';
import '../assets/Login.css';

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
      <form className="container-login">
        <div className="login-logo">
          <img src={ Logo } alt="Logo" />
        </div>
        <div className="login-email-password">
          <label htmlFor="email">
            <p className="login-email">Email</p>
            <input
              className="login-input"
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
            <p className="login-password">Password</p>
            <input
              className="login-input"
              id="password"
              type="password"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          className="login-btn"
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
