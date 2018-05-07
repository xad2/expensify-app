import { createStore, combineReducers} from 'redux';
import uuid from 'uuid';
// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});
// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});
// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate
});
// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate
});
// Filters Reducer

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      console.log('TEXT_FILTER', action.text);
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      console.log('SORT_AMOUNT');
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      console.log('SORT_DATE');
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      console.log('START_DATE', action.startDate);
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      console.log('END_DATE', action.endDate);
      return {
        ...state,
        endDate: action.endDate
      };
    default: return state;
  }
};

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      console.log('ADD', action.expense);
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      console.log('REMOVE', action.expense);
      return state.filter( (expense) => 
        expense.id !== action.id 
      );
    case 'EDIT_EXPENSE':
      return state.map( (expense) => {
        if( expense.id === action.id ) {
          console.log('EDIT', action.updates);
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        };
      });
    default: return state;
  }
};

// Get visible expenses (filter)
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense, index) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    console.log(' startDate', index, startDateMatch);

    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    console.log(' endDate', index, endDateMatch);

    const textMatch = expense.description.toLowerCase().trim().includes(text.toLowerCase().trim());
    // const textMatch = true;
    //console.log('desc', expense.description);
    console.log(' textMatch', index,  textMatch);

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => { // if return is -1 put a before b, else if a return 1 put b before a, else return same 
    if (sortBy === 'date'){ // if a < b return 1, else a > b return 1, else a = b return 0
      return a.createdAt < b.createdAt? -1 : 1; // from earliest to latest
    }else if( sortBy === 'amount'){
      return a.amount < b.amount? 1 : -1; // from greatest to lowest
    }
  });
};

// Store creation

const store = createStore(
  combineReducers({ // get dispatched to both reducers
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -259 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 200, createdAt: -202 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}));
store.dispatch(sortByAmount());

// store.dispatch(setTextFilter());

store.dispatch(setStartDate(-300));
// store.dispatch(setStartDate());
store.dispatch(setEndDate(100234));
// store.dispatch(setEndDate());
store.dispatch(sortByDate());



// store.dispatch(setTextFilter('rent'));

const demoState = {
  expenses: [{
    id: 'sakdfjk',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};