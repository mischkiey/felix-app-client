import React from 'react';
import TransactionsContext from '../contexts/TransactionsContext';
import TransactionsService from '../services/transactions-service';
import Transaction from '../components/Transaction/Transaction';

export default class TransactionRoute extends React.Component{
  static contextType = TransactionsContext;

  state = {
    transaction: {},
  }

  handleChange = data => {
    this.setState({ transaction : data})
  }

  componentDidMount = () => {
      const {type, id} = this.props.match.params;

      TransactionsService.getSingleTransaction(type, id)
      .then(res => this.setState({
        transaction: {...res, type: type}
      }))
      .catch(error => this.context.setError(error))
    }

  componentWillUnmount = () => {
      this.context.clearError();
  }

  render(){
    return(
      <section className='single_transaction'>
        <h2 className='single_transaction_header sectionHeaderALT'>
          Transaction
        </h2> 
        <Transaction
          handleChange={this.handleChange}
          transaction={this.state.transaction}
          {...this.props}
          />
      </section>
    );
  }
}