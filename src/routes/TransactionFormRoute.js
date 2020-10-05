import React from 'react';
import TransactionForm from '../components/TransactionForm/TransactionForm';

const TransactionFormRoute = (props) => {
  return (
    <section
      className='overview-group'
    >
      <TransactionForm 
        {...props}
      />
    </section>
  )
}

export default TransactionFormRoute;