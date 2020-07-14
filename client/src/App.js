import React, { useState, useEffect } from 'react';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import Balance from './components/Balance';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import EditTransaction from './components/EditTransaction';

const App = () => {
  const [edit, setEdit] = useState(false);
  store.subscribe(() => {
    setEdit(store.getState().transactions.isEdit);
  });
  return (
    <Provider store={store}>
      <div className='flex flex-col items-center'>
        <div className='max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
          <Header />
          <Balance />
          <TransactionList />
          {edit ? <EditTransaction /> : <AddTransaction />}
        </div>
      </div>
    </Provider>
  );
};

export default App;
