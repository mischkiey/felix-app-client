import React from 'react';
import Transaction from '../components/Transaction/Transaction';

const TransactionRoute = (props) => {
  return (
    <>
      <Transaction
        {...props}
      />
    </>
  );
}

export default TransactionRoute;