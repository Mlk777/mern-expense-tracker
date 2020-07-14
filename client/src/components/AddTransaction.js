import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTransaction } from '../actions/transaction';

const AddTransaction = ({ addTransaction }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      text: text && text[0].toUpperCase() + text.slice(1),
      amount: +amount,
    };
    addTransaction(newTransaction);
    setText('');
    setAmount(0);
  };
  return (
    <form className='mb-6' onSubmit={handleSubmit}>
      <h3 className='text-lg md:text-xl border-b-2 border-gray-300 text-gray-800 font-medium'>
        Add a transaction
      </h3>
      <div className='flex flex-col my-4'>
        <label htmlFor='text' className='text-lg md:text-xl mb-1'>
          Text
        </label>
        <input
          type='text'
          name='text'
          value={text}
          className='border border-gray-500 rounded-sm shadow-md px-2 py-1 text-lg md:text-xl'
          placeholder='Name of the transaction...'
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
          value={amount}
          className='border border-gray-500 rounded-sm shadow-md px-2 py-1 text-lg md:text-xl'
          placeholder='Enter amount...'
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <button className='w-full border bg-indigo-400 text-lg md:text-xl rounded-sm mt-4 mb-2 py-1 font-semibold'>
        Add Transaction
      </button>
    </form>
  );
};

AddTransaction.propTypes = {
  addTransaction: PropTypes.func.isRequired,
};

export default connect(null, { addTransaction })(AddTransaction);
