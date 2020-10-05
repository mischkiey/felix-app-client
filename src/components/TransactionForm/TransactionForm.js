import React, { Component } from 'react';
import TransactionsContext from '../../contexts/TransactionsContext';
import TransactionsService from '../../services/transactions-service';

class TransactionForm extends Component {
  static contextType = TransactionsContext;

  state = {
    type: '',
    error: null,
  }

  async componentDidMount() {
    const { type, id } = this.props.match.params;

    if(type.includes('edit')) {
      try {
        const transaction = await TransactionsService.getSingleTransaction(type.slice(5, type.length), id);
        this.setState({type: type.slice(5, type.length)});
        this.context.setTransaction(transaction);
      } catch(e) {
        console.log(e);
      }
    } else {
      this.context.clearTransaction();
    }
  }

  // name, description, category, type, amount

  handleChangeTransactionType(e) {
    this.setState({type: e.target.value});
  }

  async handleSubmitForm (e) {
    e.preventDefault();
    this.setState({error: null});

    console.log(e.target)
    // if(this.state.type === 'income') {
    //   console.log('e.target');
    // }
  }

  renderTransactionCategoryOptions(categories) {
    return categories
      .map((category, idx) => (
        <option
          key={idx}
          value={category}
        >
          {category}
        </option>
      ));
  } 

  render () {
    const { transaction = {} } = this.context;
    const { type, id } = this.props.match.params;
    
    return (
      <>
        <h2
          className='capitalize center'
        >
          {type} Transaction
        </h2>
        <form
          className='stretch'
          onSubmit={(e) =>
            this.handleSubmitForm(e)
          }
        >
        {this.state.error &&
          <div
            className='error'
            role='alert'
          >
            <p>
              {this.state.error}
            </p>
          </div>
        }
        <label
          htmlFor='transaction_name'
        >
          Transaction Name
        </label>
        <input
          aria-label='transaction name'
          className=''
          defaultValue={
            (type.includes('edit'))
              ? transaction.name
              : ''
          }
          id='transaction_name'
          onChange={(e) => {
            console.log(e);
          }}
          placeholder='Input Transaction Name'
          type='text'
          required
        />
        <label
          htmlFor='transaction_type'
        >
          Transaction Type
        </label>
        <select
          aria-label='transaction type'
          className='capitalize'
          defaultValue={
            (type.includes('income'))
              ? 'income'
              : 'expenses'
          }
          id='transaction_type'
          name='transaction_type'
          onChange={(e) => 
            this.handleChangeTransactionType(e)
          }
          required
        >
          <option
            value='income'
          >
            Income
          </option>
          <option
            value='expenses'
          >
            Expenses
          </option>
        </select>
        <label
          htmlFor='transaction_category'
        >
          Transaction Category
        </label>
        <select
          aria-label='transaction category'
          className='capitalize'
          defaultValue={
            (type.includes('edit'))
              ? transaction.category
              : ''
          }
          id='transaction_type'
          name='transaction_type'
          required
        >
          {(this.state.type === 'income')
            ? this.renderTransactionCategoryOptions(['paycheck', 'freelance', 'side_gig', 'other'])
            : this.renderTransactionCategoryOptions(['bills', 'transportation', 'food', 'entertainment', 'other'])
          }
        </select>
        <label
          htmlFor='transaction_amount'
        >
          Transaction Amount
        </label>
        <input
          aria-label='transaction amount'
          className=''
          defaultValue={
            (type.includes('expenses'))
              ? -(transaction.amount || 0)
              : transaction.amount
          }
          id='transaction_amount'
          min='0'
          onChange={(e) =>
            console.log(e)
          }
          placeholder='Input Transaction Amount'
          step='0.01'
          type='number'
          required
        />
        <label
          htmlFor='transaction_description'
        >
          Transaction Description
        </label>
        <input
          aria-label='transaction description'
          className=''
          defaultValue={
            (type.includes('edit'))
              ? transaction.description
              : ''
          }
          id='transaction_description'
          onChange={(e) => {
            console.log(e);
          }}
          placeholder='Input Transaction Description'
          type='text'
          required
        />
        
        <button
          className='center greybox-button'
        >
          SUBMIT
        </button>
        <button
          className='center greybox-button'
          onClick={() =>
            this.props.history.push('/')
          }
        >
          CANCEL
        </button>
    </form>
      </>
    )
  }
}

export default TransactionForm;