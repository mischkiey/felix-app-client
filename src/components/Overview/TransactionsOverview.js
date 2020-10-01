import React, { Component } from 'react';
import TransactionsContext from '../../contexts/TransactionsContext';
import TransactionsService from '../../services/transactions-service';

class TransactionsOverview extends Component {
  static contextType = TransactionsContext;

  renderTransactions(transactions) {
    const transactionsList = [];
    let i = 0;

    for(const trx of transactions) {
      if(i < 3 && i < transactions.length) {
        transactionsList.push(
          <li 
            className='list-item-group'
            key={i}
          >
            <span
              className='capitalize'
            >
              {trx.income_category || trx.expense_category}:
            </span>
            <span
              className=
                {(trx.income_amount)
                  ? 'income'
                  : 'expenses'
                }
            >
              {trx.income_amount || trx.expense_amount}
            </span>
          </li>
        );
      }
      i++;
    }

    return (
      <>
        <ul
          className='list-group'
        >
          {transactionsList}
        </ul>
        <button
          className='greybox-button right'
          onClick={() =>
            this.props.history.push('/transactions')
          }
          type='click'
        >
        SEE ALL
        </button>
      </>
    );
  }

  async fetchData() {
    try {
      const { income, expenses } = await TransactionsService.getAllTransactions();
      const sortedTransactions = this.context.sortTransactions([...income, ...expenses], 'date_created');
      this.context.setTransactions(sortedTransactions);
    }
    catch(error) {
      this.context.setError(error);
    }
  };

  componentDidMount() {
    this.fetchData()
  };

  render() {
    const { transactions = [] } = this.context;

    return (
      <section
        className='overview-group'
      >
        <div
          className='overview-header-group'
        >
          <h2
            className=''
          >
            Transactions Overview
          </h2>
          <i 
            className='material-icons'
            onClick={() =>
              this.props.history.push('/createtransaction')}
            type='click'
          >
            add_circle
          </i>
        </div>
        {(transactions.length)
            ? this.renderTransactions(transactions)
            : ''
        }
      </section>
    );
  }
}

export default TransactionsOverview;