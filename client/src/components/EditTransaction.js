import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTransaction } from '../actions/transaction';
import { getTransactions } from '../actions/transaction';

const EditTransaction = ({ current, editTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    const updatedTransaction = {
      text,
      amount: +amount,
    };
    editTransaction(current._id, updatedTransaction);
  };

  useEffect(() => {
    setText(current.text);
    setAmount(current.amount);
    getTransactions();
  }, [current]);
  return (
    <form className='mb-6' onSubmit={handleSubmit}>
      <h3 className='text-lg md:text-xl border-b-2 border-gray-300 text-gray-800 font-medium'>
        Edit a transaction
      </h3>
      <div className='flex flex-col my-4'>
        <label htmlFor='text' className='text-lg md:text-xl mb-1'>
          Text
        </label>
        <input
          type='text'
          name='text'
          className='border border-gray-500 rounded-sm shadow-md px-2 py-1 text-lg md:text-xl'
          placeholder='Name of the transaction...'
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <div className='flex flex-col '>
        <label
          htmlFor='expense'
          className='flex flex-col leading-tight mb-2 text-lg md:text-xl '
        >
          <h4 className=''>Amount</h4>
          <h4 className='text-sm md:text-base text-gray-500'>
            (negative - expense, positive - income)
          </h4>{' '}
        </label>
        <input
          type='number'
          name='amount'
          className='border border-gray-500 rounded-sm shadow-md px-2 py-1 text-lg md:text-xl'
          placeholder='Enter new amount...'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <button className='w-full border bg-indigo-400 text-lg md:text-xl rounded-sm mt-4 mb-2 py-1 font-semibold'>
        Edit Transaction
      </button>
    </form>
  );
};

EditTransaction.propTypes = {
  editTransaction: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  current: state.transactions.current,
});

export default connect(mapStateToProps, { editTransaction })(EditTransaction);
