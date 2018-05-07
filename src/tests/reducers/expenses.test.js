import expensesReducer from '../../reducers/expenses';
import expenses from '../dummydata/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});
test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses,action);
  expect(state).toEqual(expenses);
});
test('should add an expense', () => {
  const expense = {
    description: 'a',
    id: '4',
    note: '',
    amount: 0,
    createdAt: 0
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense 
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '2',
    updates: { description: 'blabla', note: 'edited', amount: 55555555}
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], {...expenses[1], ...action.updates}, expenses[2]]);
});

test('should not edit an expense if not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '4',
    updates: { description: 'blabla', note: 'edited', amount: 55555555}
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});