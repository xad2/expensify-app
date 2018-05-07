import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../dummydata/expenses';

test('should render ExpenseListItem with dummy data', () => {
  const wrapper = shallow(<ExpenseListItem key={expenses[0].id} expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});