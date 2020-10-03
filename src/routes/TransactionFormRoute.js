import React from 'react';
import TransactionForm from '../components/TransactionForm/TransactionForm';

const TransactionFormRoute = (props) => {
  console.log('Hello')
  console.log(props.location.state)
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