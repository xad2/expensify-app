
import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter.js';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses.js';
import {addExpense} from './actions/expenses.js';
import expenseReducers from './reducers/expenses.js';
import {setTextFilter} from './actions/filters.js';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Water bill', amount: 100, createdAt: -259 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Gast bill', amount: 200, createdAt: -202 }));
const expenseThree = store.dispatch(addExpense({ description: 'Rent', amount: 1200, createdAt: -145 }));

// store.dispatch(setTextFilter('water'));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));

