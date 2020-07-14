import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import { getTransactions } from '../actions/transaction';

const TransactionList = ({ transactions, getTransactions }) => {
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className='my-6'>
      <h3 className='text-lg md:text-xl border-b-2 border-gray-300 text-gray-800 font-medium'>
        History
      </h3>
      {transactions.length > 0 ? (
        transactions.map(transaction => (
          <Transaction transaction={transaction} key={transaction._id} />
        ))
      ) : (
        <p className='text-lg md:text-xl text-gray-800'>No transaction yet</p>
      )}
    </div>
  );
};

TransactionList.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.array,
};

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
});

export default connect(mapStateToProps, { getTransactions })(TransactionList);
