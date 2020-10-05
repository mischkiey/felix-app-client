import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TransactionsContext from '../../contexts/TransactionsContext';
import TransactionsService from '../../services/transactions-service';

class Transactions extends Component {
  static contextType = TransactionsContext;

  renderTransactionParams(transaction) {
    if('income_amount' in transaction) {
      return `/transaction/income/${transaction.id}`;
    }

    return `transaction/expenses/${transaction.id}`;
  }

  renderTransactions(transactions) {
    const transactionsList = transactions
      .map((trx, i) => {
        return (
          <li 
            className=''
            key={i}
          >
            <Link
              className='list-item-group'
              to={this.renderTransactionParams(trx)}
            >
              <span 
                className='capitalize'
              >
                {trx.income_category || trx.expense_category}
              </span>
              <span
                className=
                {(trx.income_amount) ? 'income' : 'expenses'}
                >
                {trx.income_amount || trx.expense_amount}
              </span>
            </Link>
          </li>
        );
    });
    return (
      <ul
        className='list-group'
      >
        {transactionsList}
      </ul>
    )
  }

  async componentDidMount() {
    try {
      const { income, expenses } = await TransactionsService.getAllTransactions();
      const sortedTransactions = this.context.sortTransactions([...income, ...expenses], 'date_created');
      this.context.setTransactions(sortedTransactions);
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    const { transactions = [] } = this.context;

    return (
      <article
        className='overview-group'
      >
        <div
          className='overview-header-group'
        >
          <h2
            className=''
          >
            Transactions
          </h2>
          <i 
            className='material-icons'
            onClick={() =>
              this.props.history.push('/transaction-form/add/0')
            }
            type='click'
          >
            add_circle
          </i>
        </div>
        {
          (transactions.length)
            ? this.renderTransactions(transactions)
            : ''
        }
        <button
          className='center greybox-button'
          onClick={() =>
            this.props.history.push('/')}
            type='click'
        >
          BACK
        </button>
      </article>
    );
  }
}

export default Transactions;