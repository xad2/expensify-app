import React from 'react';
import { shallow } from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../dummydata/expenses';

let editExpense, removeExpense, expense, history, wrapper;
beforeEach( () => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn()};
  expense = expenses[2];
  wrapper = shallow(<EditExpensePage expense={expense} editExpense={editExpense} removeExpense={removeExpense} history={history}/>);
});
test('should render editExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
test('should handle editExpense correctly', () => {
  const editedExpense = {description: 'edited expense', id: '3'};
  wrapper.find('ExpenseForm').prop('onSubmit')(editedExpense);
  expect(editExpense).toHaveBeenCalledWith(editedExpense.id, editedExpense);
  expect(history.push).toHaveBeenCalledWith('/');
  expect(wrapper).toMatchSnapshot();
});
test('should handle removeExpense correctly', () => {
  wrapper.find('button').simulate('click');
  expect(removeExpense).toHaveBeenCalledWith(expense);
  expect(history.push).toHaveBeenCalledWith('/');
  expect(wrapper).toMatchSnapshot();
});