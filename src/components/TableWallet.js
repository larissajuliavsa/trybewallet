import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenseDelete, editTableForm } from '../actions/wallet';
import Edit from '../assets/img/Edit.svg';
import Delete from '../assets/img/Delete.svg';
import '../assets/TableWallet.css';

class TableWallet extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
  }

  delete(id) {
    const { deleteExpense } = this.props;
    deleteExpense(id);
    // função recebendo id que foi clicado e enviando para action de deletar
  }

  editTable(id) {
    const { expenses, editExpense } = this.props;

    const findIdExpense = expenses.find((edit) => edit.id === id);

    editExpense(findIdExpense);
  }

  render() {
    const { expenses } = this.props;
    // para evitar o warning no console, utilizei a tag <thead> e <tbody>
    return (
      <table className="container-table">
        <div className="container-table-form">
          <thead>
            <tr>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Método de pagamento</th>
              <th>Tag</th>
              <th>Descrição</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Câmbio utilizado</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </div>
        <tbody>
          <div className="container-table-body">
            {expenses.map((eachExpense) => {
              const {
                id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              } = eachExpense;
              return (
                <tr key={ id }>
                  <td>
                    {Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td>{exchangeRates[currency].name.split('/')[0]}</td>
                  <td>{method}</td>
                  <td>{tag}</td>
                  <td>{description}</td>
                  <td>
                    {
                      Number(value * exchangeRates[currency].ask)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    {
                      Number(exchangeRates[currency].ask)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                    }
                  </td>
                  <td>
                    <div className="container-table-btns">
                      <button
                        className="table-btns"
                        type="button"
                        onClick={ () => this.editTable(id) }
                        data-testid="edit-btn"
                      >
                        <img src={ Edit } alt="Edit" />
                      </button>
                      <button
                        className="table-btns"
                        type="button"
                        onClick={ () => this.delete(id) }
                        data-testid="delete-btn"
                        key={ id }
                      >
                        <img src={ Delete } alt="Delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

          </div>
        </tbody>
      </table>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(getExpenseDelete(id)),
  editExpense: (id) => dispatch(editTableForm(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableWallet.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
