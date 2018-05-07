import React from 'react';
// import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';
import {Link, NavLink} from 'react-router-dom';

export default (
  ({expense}) => {
  // (props) => {
    return (
      <div>
        <div><Link to={`/edit/${expense.id}`} >{expense.description}</Link></div>
        <div>{expense.amount}</div>
        <div>{expense.createdAt}</div>        
      </div>
    );
  }
);

 