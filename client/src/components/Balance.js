import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Balance = ({ transactions }) => {
  const amounts = transactions.map(transaction => transaction.amount);
  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = amounts
    .filter(amount => amount < 0)
    .reduce((acc, item) => (acc += item * -1), 0)
    .toFixed(2);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  return (
    <div>
      <div className='p-2'>
        <h2 className='flex self-start text-lg md:text-xl lg-text-2xl text-gray-800 font-medium'>
          Your current balance
        </h2>
        <p className='text-xl md:text-2xl lg-text-3xl font-semibold'>
          ${total}
        </p>
      </div>
      <div className='w-11/12 mx-auto md:w-full border border-gray-200 p-2 md:p-0 shadow rounded-sm'>
        <div className='flex my-4'>
          <div className='flex-1 flex-col text-center border-r-2'>
            <h3 className='text-lg font-semibold'>INCOME</h3>
            <p className='text-green-500 text-lg md:text-xl text-semibold'>
              ${income}
            </p>
          </div>
          <div className='flex-1 flex-col text-center'>
            <h3 className='text-lg font-semibold'>EXPENSE</h3>
            <p className='text-red-700 text-lg md:text-xl text-semibold'>
              ${expense}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Balance.propTypes = {
  transactions: PropTypes.array,
};

const mapStateToProps = state => ({
  transactions: state.transactions.transactions,
});

export default connect(mapStateToProps)(Balance);
