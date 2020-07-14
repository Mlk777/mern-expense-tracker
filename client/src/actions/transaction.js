import axios from 'axios';
import {
  GET_TRANSACTION,
  ADD_TRANSACTION,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION,
  SET_EDIT,
  SET_CURRENT,
  TRANSACTION_ERROR,
} from './types';

export const getTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/transactions');
    dispatch({
      type: GET_TRANSACTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const addTransaction = transaction => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/transactions', transaction, config);
    dispatch({
      type: ADD_TRANSACTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: {
        error: err.response.data.error[0],
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const setCurrent = transaction => async dispatch => {
  dispatch({ type: SET_EDIT });
  dispatch({ type: SET_CURRENT, payload: transaction });
};
export const editTransaction = (id, updatedTransaction) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/v1/transactions/${id}`,
      updatedTransaction,
      config
    );

    dispatch({ type: EDIT_TRANSACTION, payload: res.data });
    dispatch(getTransactions());
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteTransaction = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/transactions/${id}`);
    dispatch({ type: DELETE_TRANSACTION, payload: id });
  } catch (error) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
